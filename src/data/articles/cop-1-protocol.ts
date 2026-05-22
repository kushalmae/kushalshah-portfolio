import type { ArticleContent } from "./types";

const article: ArticleContent = {
  slug: "cop-1-protocol",
  title: "COP-1: Reliable Telecommand at the Transfer Layer",
  subtitle: "FOP-1, FARM-1, and the go-back-n discipline behind sequence-controlled commanding",
  description:
    "COP-1 is where telecommand stops being 'send a frame and hope' and becomes a closed-loop delivery service. Understanding FOP-1, FARM-1, and the CLCW feedback path is prerequisite work for anyone implementing TC or USLP commanding.",
  date: "May 2026",
  readTime: "11 min read",
  tags: ["Aerospace", "Systems Engineering", "Communications"],
  intro: [
    "The Communications Operation Procedure-1 (COP-1) sits in the Transfer Sublayer of the CCSDS space data link stack. It is not a physical bus and not a routing protocol — it is a closed-loop Data Link Layer procedure engineered to support the Telecommand (TC) Space Data Link Protocol and the Unified Space Data Link Protocol (USLP). Its job is narrow and exacting: deliver service data units to the receiving higher layer correct, without omission or duplication, and in the exact sequential order they were submitted.",
    "Implementation teams often treat COP-1 as an afterthought bolted onto a radio driver. That is a mistake. COP-1 operations are predicated on frames passing the Frame Validation Check at lower layers — only checksum-valid, well-formed transfer frames enter the FOP-1 and FARM-1 state machines. The synchronization between the Frame Operation Procedure-1 (FOP-1) at the sender and the Frame Acceptance and Reporting Mechanism-1 (FARM-1) at the receiver is the entire reliability contract for sequence-controlled commanding.",
  ],
  sections: [
    {
      id: "overview",
      label: "Foundation",
      heading: "What COP-1 Actually Guarantees",
      paragraphs: [
        "COP-1 enforces a go-back-n Automatic Repeat Request (ARQ) mechanism. When the receiver detects a sequence gap, buffer congestion, or lockout condition, it signals the sender through the Communications Link Control Word (CLCW) embedded in telemetry. FOP-1 responds by aborting outstanding lower-layer transfers, marking every unacknowledged frame in the Sent_Queue for retransmission, and replaying them in order.",
        "The protocol provides two service paths on a per-Virtual Channel (VC) basis. Sequence-Controlled (AD) service is the primary reliability path — strict sequentiality, automatic retransmission, no gaps. Expedited (BD) service is single-shot: COP-1 does not retransmit BD frames, and sequentiality is not guaranteed. BD exists for spacecraft recovery scenarios, deep-space systematic retransmissions handled above COP-1, or cases where a higher-layer ARQ already owns ordering.",
        "The architect's framing is simple: AD service is how you command a spacecraft during normal operations. BD service is how you push an unlock or recovery frame when the AD path is blocked — but mixing the two on the same VC without understanding buffer interaction is how you silently lose data.",
      ],
      diagramId: "cop-fop-farm",
    },
    {
      id: "services",
      label: "Section 01",
      heading: "AD vs. BD: Two Services, One Virtual Channel",
      paragraphs: [
        "Every Virtual Channel independently selects AD or BD service. AD frames carry the sequence number N(S) and participate in the full FOP/FARM handshake. BD frames bypass COP-1 retransmission entirely — they transmit once and the sender moves on.",
        "The critical implementation trap is buffer erasure. When a Type-BD frame arrives at FARM-1 while an AD Frame Data Unit (FDU) is waiting in the receive buffer, the BD frame may erase that AD FDU without generating a negative acknowledgement to the sender. The ground segment believes the command was accepted; the spacecraft never delivered it to the application layer. Software that switches between AD and BD on the same VC must sequence those transitions explicitly and never interleave BD traffic into an active AD session without clearing state on both ends.",
      ],
      table: {
        headers: ["Service", "Retransmission", "Sequentiality", "Typical Use"],
        rows: [
          [
            "Sequence-Controlled (AD)",
            "Automatic go-back-n via CLCW or T1 timer",
            "Strict — no gaps or duplicates",
            "Standard mission commanding, critical uploads",
          ],
          [
            "Expedited (BD)",
            "None at COP-1 layer",
            "Not guaranteed; out-of-sequence possible",
            "Recovery, deep-space link ops, higher-layer ARQ",
          ],
        ],
      },
    },
    {
      id: "fop",
      label: "Section 02",
      heading: "FOP-1: The Sending State Machine",
      paragraphs: [
        "FOP-1 is the master state machine at the transmitting end. Its internal logic revolves around two sequence variables and a set of Out_Flags that gate the interface to Lower Procedures. Transmitter_Frame_Sequence_Number V(S) is the N(S) value assigned to the next Type-AD frame. Expected_Acknowledgement_Frame_Sequence_Number NN(R) tracks the N(R) from the most recent CLCW on that VC — it marks the oldest frame still awaiting confirmation.",
        "The Out_Flags — AD_Out, BC_Out, BD_Out — report Ready or Not_Ready status to the implementation. Not_Ready means a Transmit Request is outstanding in the Lower Procedures and no further frames of that type may be passed until an Accept response arrives. Ignoring Out_Flags is a common source of buffer overrun at the encoder.",
        "FOP-1 operates in six states. S1 (Active) is normal commanding: in-sequence AD transmission with positive CLCW processing. S2 (Retransmit without Wait) replays the Sent_Queue after a sequence error with Retransmit=1 and Wait=0. S3 (Retransmit with Wait) suspends transmission while the receiver clears congestion — Wait=1 in the CLCW. S4 and S5 are initialization states waiting for a clean status report or BC-frame confirmation. S6 (Initial) is the default inactive state; all queues purge on entry. Any implementation that cannot log state transitions with the associated CLCW snapshot will be impossible to debug during link anomaly investigations.",
      ],
      diagramId: "cop-fop-states",
    },
    {
      id: "farm",
      label: "Section 03",
      heading: "FARM-1: Acceptance, Lockout, and CLCW Reporting",
      paragraphs: [
        "FARM-1 governs frame acceptance at the receiver using Receiver_Frame_Sequence_Number V(R). In the Open state, in-sequence Type-A frames are accepted and V(R) increments. In Wait, incoming Type-A frames are discarded because the higher layer cannot accept more FDUs — the Wait Flag in the CLCW tells FOP-1 to hold. In Lockout, all Type-A frames are discarded until an Unlock command arrives; entry occurs when N(S) falls into the Lockout Area outside the configured sliding window.",
        "The CLCW is the sole status feedback channel from spacecraft to ground for COP-1. Four fields drive FOP-1 behavior. Lockout Flag = 1 signals a sequence error outside the window — commanding must stop until Unlock. Wait Flag = 1 signals receive-buffer congestion. Retransmit Flag = 1 triggers go-back-n at the sender after a gap or buffer discard. N(R) reports the current V(R) as a cumulative acknowledgement: every frame with N(S) < N(R) is confirmed received.",
        "Architecturally, CLCW reporting period is not a performance tuning knob — it is a stability parameter. Set it too long and T1 timers fire before the ground sees a negative acknowledgement, causing unnecessary retransmissions. Set it too short and telemetry bandwidth consumed by status reporting crowds out mission data.",
      ],
    },
    {
      id: "window",
      label: "Section 04",
      heading: "Sliding Windows: Preventing the Sender from Lapping the Receiver",
      paragraphs: [
        "The sliding window mechanism is how COP-1 implements flow control. At the sender, FOP Sliding Window K defines the maximum number of unacknowledged AD frames permitted in flight simultaneously. Valid range is 1 ≤ K ≤ PW with K < 256. Exceeding K frames without acknowledgement is a protocol violation, not merely a performance issue.",
        "At the receiver, FARM Sliding Window W sets total sequence space width, with Positive Window PW and Negative Window NW defining acceptable lead and lag relative to V(R). When retransmission is permitted for AD frames, W must be an even integer between 2 and 254, with PW = NW = W/2. When retransmission is not permitted, W may range from 1 to 256 with PW up to W and NW as 0. Ground and spacecraft must agree on these values at initialization — a mismatch does not produce a clean error; it produces intermittent lockout.",
      ],
      diagramId: "cop-sliding-window",
    },
    {
      id: "retransmit",
      label: "Section 05",
      heading: "Go-Back-n Retransmission and Error Recovery",
      paragraphs: [
        "Retransmission initiates when FOP-1 receives a negative CLCW indication or the T1 timer expires. The procedural sequence is deterministic: signal Lower Procedures to abort outstanding transfers on the VC, increment Transmission_Count, reset the timer to T1_Initial, mark every unacknowledged frame in Sent_Queue with the To_Be_Retransmitted_Flag, then sequentially pass copies to Lower Procedures — clearing each flag only on Accept.",
        "If Transmission_Limit is exceeded, FOP-1 issues an Alert notification. Timeout_Type (TT) determines the outcome. TT = 0 (Alert) terminates service and returns to S6 — appropriate when continued commanding would be unsafe. TT = 1 (Suspend) halts operations but preserves queues — the configuration used on deep-space links where link geometry may recover hours later and replay is preferable to re-initiating the entire command session.",
        "Standard reason codes for telemetry logging map directly to investigation playbooks: [limit] for exhausted retries, [T1] for timer expiry, [synch] for sequence anomalies, [LLIF] for Lower Layer Interface failure, [term] for management termination, [NN(R)] for invalid CLCW reporting. A ground system that surfaces these codes in operator displays saves hours during anomaly response.",
      ],
      diagramId: "cop-retransmit",
    },
    {
      id: "init",
      label: "Section 06",
      heading: "Initialization and BC Control Commands",
      paragraphs: [
        "Establishing AD service requires FOP-1 to transition from S6 to S1 through a defined directive sequence. Initiate (without CLCW check) forces immediate S1 entry — used only when the link status is already known good. Initiate (with CLCW check) enters S4 and waits for a valid CLCW with Retransmit=0 and Wait=0 before proceeding. Initiate (with Unlock) transmits a Type-BC frame to clear FARM-1 Lockout and enters S5 until CLCW confirms acceptance. Initiate (with Set V(R)) transmits a BC frame forcing the receiver's V(R) to a specified value V*(R) — used after spacecraft reset or handover between ground stations.",
        "Type-BC transfer frames bypass the sequence check at the receiver but still increment the FARM-B Counter. Implementation teams must ensure BC frames route through a separate encoder path gated by BC_Out, not through the AD frame pipeline. Mixing BC and AD through the same queue without respecting Out_Flags produces BC frames that arrive out of administrative order.",
      ],
    },
    {
      id: "params",
      label: "Section 07",
      heading: "Managed Parameters: The Mission Configuration Contract",
      paragraphs: [
        "COP-1 managed parameters are static mission constants — not runtime tunables. They must be identical across ground and space segments and documented in the Interface Control Document. T1_Initial sets the first-timeout value. Transmission_Limit bounds retry attempts before Alert. FOP Sliding Window K and FARM windows W/PW/NW define the sequence space geometry. Timeout_Type selects Alert versus Suspend behavior. CLCW Reporting Period sets how frequently the spacecraft publishes status.",
        "For the authoritative state transition tables — every edge condition, guard, and action — implementation teams must reference CCSDS 232.1-B-2 Blue Book Sections 5.3 (FOP-1) and 6.3 (FARM-1). The prose specification defines intent; the state tables define behavior. Test plans that validate COP-1 against paraphrased requirements rather than the state tables routinely pass in the lab and fail on orbit.",
      ],
      table: {
        headers: ["Parameter", "Entity", "Constraint"],
        rows: [
          ["T1_Initial", "FOP-1", "Integer (seconds or ticks)"],
          ["Transmission_Limit", "FOP-1", "Integer ≥ 1"],
          ["FOP Sliding Window (K)", "FOP-1", "1 ≤ K ≤ 255; K ≤ PW"],
          ["Timeout_Type (TT)", "FOP-1", "0 = Alert, 1 = Suspend"],
          ["FARM Sliding Window (W)", "FARM-1", "1 ≤ W ≤ 256 (even if retransmission allowed)"],
          ["FARM Positive Window (PW)", "FARM-1", "1 to 256"],
          ["FARM Negative Window (NW)", "FARM-1", "0 to 127"],
          ["CLCW Reporting Period", "FARM-1", "Real number (seconds)"],
        ],
      },
      relatedArticle: {
        slug: "spacecraft-communication-protocols",
        label: "Back: Spacecraft Communication Protocols",
      },
    },
  ],
  insight:
    "COP-1 is not complicated because the state machines have six states — it is complicated because every failure mode is silent until the CLCW arrives, and the CLCW only arrives if you configured the windows, timers, and reporting period as a single coherent contract across ground and space.",
};

export default article;
