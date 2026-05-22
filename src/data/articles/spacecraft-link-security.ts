import type { ArticleContent } from "./types";

const article: ArticleContent = {
  slug: "spacecraft-link-security",
  title: "The Complete Guide to Spacecraft Link Encryption",
  subtitle: "SDLS, SPIs, SAs, and MACs",
  description:
    "As civil and commercial space expands, satellite links face takeover, interception, and jamming — not obscurity. CCSDS Space Data Link Security (SDLS) secures telecommand and telemetry at the data link layer through Security Associations, SPI-indexed rulebooks, frame-level MACs, anti-replay windows, and over-the-air rekeying.",
  date: "May 2025",
  readTime: "12 min read",
  tags: ["Aerospace", "Systems Engineering", "Security", "CCSDS"],
  attachment: {
    url: "/spacecraft-link-security.pdf",
    label: "Download Full Guide (PDF)",
    downloadFilename: "Spacecraft_Link_Security.pdf",
  },
  intro: [
    "As the civil and commercial space industry rapidly expands, securing satellite communications is more critical than ever. Hostile takeover, data interception, and jamming are no longer theoretical risks on high-value missions — they are operational threats architects must design against from day one.",
    "Historically, some missions relied on security through obscurity. Modern space operations instead depend on standardized protocols. Chief among these is Space Data Link Security (SDLS), published by the Consultative Committee for Space Data Systems (CCSDS), which secures data directly at the data link layer — transforming a raw, unsecured space link into encrypted, authenticated transfer frames before application software ever sees the bits.",
  ],
  sections: [
    {
      id: "sdls-overview",
      label: "Quick Reference",
      heading: "From Raw Link to Secured Frame",
      paragraphs: [
        "SDLS sits between the physical radio link and mission application logic. The ground station encrypts and authenticates outgoing telecommands; the spacecraft verifies, decrypts, and acts only on frames that pass every check in the Security Association rulebook. The table below maps the core objects every architect must provision before launch.",
      ],
      table: {
        headers: ["Object", "Role", "Where It Lives", "Architect's Question"],
        rows: [
          ["SPI", "Index label", "Security Header (visible)", "Which rulebook applies to this frame?"],
          ["SA", "Rulebook", "Onboard database", "What algorithm, key, MAC length, and sequence state govern this link?"],
          ["Session Key", "Traffic secret", "Inside the SA", "What material powers daily TC/TM protection?"],
          ["Master Key", "Distribution secret", "Heavily guarded tier", "How do we wrap new session keys during OTAR?"],
          ["MAC", "Tamper-evident seal", "Security Trailer", "Did the sender use the right key and leave the payload intact?"],
          ["Sequence Number", "Anti-replay counter", "Security Header", "Is this frame fresh, or a recorded replay?"],
          ["FSR", "Return receipt", "Telemetry OCF", "Why did the spacecraft reject the last secured frame?"],
        ],
      },
      relatedArticle: {
        slug: "spacecraft-communication-protocols",
        label: "Prerequisite: Spacecraft Communication Protocols",
      },
    },
    {
      id: "two-highways",
      label: "Framework 01",
      heading: "The Two Highways: Telecommand and Telemetry",
      paragraphs: [
        "Spacecraft communication generally flows in two distinct directions, each facing different security threats. Telecommand (TC), the uplink, carries commands from the ground to the spacecraft. The operational goal is reliable command execution. Threats include unauthorized control, replayed old commands, and modified commands in transit. The security need is strict authentication and anti-replay — confidentiality matters, but proving who sent the command and that it is current often dominates the architecture.",
        "Telemetry (TM), the downlink, carries health, status, and payload data from the spacecraft to the ground. Threats here center on interception of sensitive health metrics or proprietary payload products, and on undetected corruption of status reports. The security need emphasizes confidentiality and integrity so operators trust what they see on the console.",
        "Because these links are strictly simplex, uplink and downlink use completely different Security Associations — different keys, different SPI labels, different sequence counters. An architect who treats them as one symmetric security problem will mis-specify the onboard database and break anti-replay on the first counter reset.",
      ],
    },
    {
      id: "sa-spi",
      label: "Framework 02",
      heading: "The Core Mental Model: SPI, SA, and Crypto Execution",
      paragraphs: [
        "SDLS organizes security in three layers that must not be collapsed. The Security Parameter Index (SPI) is the label transmitted in the header — it tells the receiver which profile to load. The Security Association (SA) is the rulebook: the database entry that defines exactly how to process the frame — algorithm, key material, MAC length, and current sequence state. Crypto execution is the protocol behavior that applies the algorithm, key, and sequence state dictated by the SA.",
        "If the SA is the contract, the SPI is how the spacecraft selects which contract is in force for this frame. The SPI is not the key. It is transmitted in the clear so link layers can route traffic while crypto processors load the correct SA. Selecting the wrong SPI is not a formatting error — it dictates command authority and which cryptographic rules apply.",
      ],
    },
    {
      id: "frame-anatomy",
      label: "Framework 03",
      heading: "Anatomy of a Secured Transfer Frame",
      paragraphs: [
        "Not every part of a frame is encrypted. Link layers need visible headers to route traffic through relays, virtual channels, and ground networks. SDLS therefore splits the frame into protected and visible regions.",
        "Routing information remains visible so the link can deliver the frame. The Security Header carries the SPI label, Initialization Vector (IV), and sequence number — enough for the receiver to select the SA and verify freshness without decrypting the payload. The data field carries the ciphertext when confidentiality is required. The Security Trailer carries the Message Authentication Code. Forward error correction (for example Reed–Solomon) may wrap the assembly depending on the underlying space data link protocol.",
        "The architect implication is direct: header visibility is a feature, not a leak of the secret key. Confidentiality applies to the payload; authenticity and anti-replay apply to the combination the SA specifies.",
      ],
    },
    {
      id: "crypto-services",
      label: "Framework 04",
      heading: "Choosing a Cryptographic Service",
      paragraphs: [
        "Each SA selects which security services apply. Confidentiality hides data from eavesdroppers. Integrity detects tampering. Authenticity proves the sender possessed the key. The combinations are not interchangeable.",
      ],
      table: {
        headers: ["Service Mix", "Confidentiality", "Integrity", "Authenticity", "Typical Use"],
        rows: [
          ["Authentication only", "—", "✓", "✓", "Commands where visibility is acceptable but tampering is not"],
          ["Encryption only", "✓", "—", "—", "Rare; data hidden but blind corruption possible"],
          ["Full protection (AES-GCM)", "✓", "✓", "✓", "Modern baseline for high-value TC and sensitive TM"],
        ],
      },
    },
    {
      id: "mac",
      label: "Framework 05",
      heading: "Proving Authenticity: The MAC",
      paragraphs: [
        "The Message Authentication Code (MAC) is the tamper-evident wax seal on the frame. When the ground station builds a telecommand, it uses the SA's secret key and algorithm to compute the MAC appended in the Security Trailer. The spacecraft recomputes the MAC with its copy of the key. Match means the sender is authorized and the bits are unmodified. Mismatch means instant rejection — no partial credit.",
        "Frame-level authentication is efficient: one MAC can cover a grouped set of transfer frames without repeating crypto overhead on every sub-packet, which matters on bandwidth-constrained space links. When troubleshooting, treat MAC failures as key mismatch, wrong algorithm configuration, or in-transit corruption until proven otherwise.",
      ],
    },
    {
      id: "command-authority",
      label: "Framework 06",
      heading: "Command Authority: General, Controlled, and Clear Modes",
      paragraphs: [
        "SPI selection maps to command authority tiers. A General SPI handles routine operational traffic — housekeeping polls, low-impact commanding. A Controlled SPI is a restricted, high-authority SA for operations that affect mission survival: propulsion enables, mode changes, or security key updates.",
        "Clear mode applies zero encryption and zero authentication. It is high risk by definition and must be heavily monitored. Reserve it for safe-mode recovery, early launch acquisition, or debugging paths where no provisioned SA is yet active. Never treat clear mode as a convenience default — every clear frame is visible to anyone with a receiver.",
      ],
    },
    {
      id: "decryption-gate",
      label: "Framework 07",
      heading: "The Decryption Gate: Receiver-Side Processing",
      paragraphs: [
        "Onboard verification is a strict pipeline. Each stage fails closed — reject and log, never pass ambiguous frames to command execution.",
      ],
      table: {
        headers: ["Step", "Action", "Failure Mode"],
        rows: [
          ["1", "Parse visible header and read SPI", "Reject: corrupt format"],
          ["2", "Lookup SA in onboard database", "Reject: SPI inactive or unprovisioned"],
          ["3", "Check sequence number within allowed window", "Reject: replay or counter loss of sync"],
          ["4", "Verify MAC against recomputed value", "Reject: tamper or wrong key"],
          ["5", "Decrypt payload per SA policy", "Deliver to command or telemetry chain"],
        ],
      },
    },
    {
      id: "replay-fsr",
      label: "Framework 08",
      heading: "Anti-Replay, FSRs, and Troubleshooting",
      paragraphs: [
        "Encryption alone does not stop replay. An attacker can record an encrypted turn-off-transmitter command and broadcast it later. The Security Header's sequence number ties each frame to the SA's current anti-replay state. Receivers maintain an allowed window — frames outside it are discarded even when the MAC is valid.",
        "When verification fails, operators need more than silence. The Frame Security Report (FSR), returned via telemetry in the Operational Control Field, is the return receipt: it flags which rejection branch fired so teams can distinguish invalid MAC (wrong key or corruption) from sequence failure (replay or ground/space counter desync) from SPI errors (unprovisioned or inactive association).",
      ],
      table: {
        headers: ["FSR Alarm", "Likely Cause", "First Response"],
        rows: [
          ["Invalid MAC", "Wrong key, algorithm mismatch, link corruption", "Verify active SA key material on ground and spacecraft"],
          ["Sequence failure", "Replay attempt, counter reset without coordination", "Compare sequence state; resync under controlled procedure"],
          ["SPI not valid", "Wrong SPI for channel, inactive SA", "Audit SPI map against mission database"],
        ],
      },
    },
    {
      id: "otar",
      label: "Framework 09",
      heading: "Key Management and Over-The-Air Rekeying (OTAR)",
      paragraphs: [
        "Keys cannot live forever on orbit. Missions use a two-tier hierarchy to limit exposure. Session keys protect daily TC/TM traffic and rotate frequently to cap cryptanalytic gain. Master keys are heavily guarded — used rarely, solely to encrypt and unwrap new session keys during Over-The-Air Rekeying (OTAR).",
        "SDLS Extended Procedures (SDLS-EP) add a Key Management Service and Security Association Management Service so ground teams can upload encrypted keys, activate them, and expire old ones without dropping the link. That architecture is what separates sustainable long-duration missions from one-key-for-life designs that cannot survive compromise, personnel turnover, or routine rotation policy.",
      ],
    },
  ],
  insight:
    "Link security is not one key for the whole mission — it is a matrix of Security Associations, SPI authority levels, and anti-replay state on each simplex direction. The architect's job is to make that matrix explicit before launch, not discover it during the first FSR storm on orbit.",
};

export default article;
