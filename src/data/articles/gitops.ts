import type { ArticleContent } from "./types";

const article: ArticleContent = {
  slug: "gitops",
  title: "GitOps as an Operating Model",
  subtitle: "Declarative infrastructure, pull-based deploys, and why Git becomes the control plane",
  description:
    "GitOps is not a tool category — it is a contract between humans and clusters: desired state lives in version control, controllers reconcile continuously, and every change is auditable before it touches production.",
  date: "May 2026",
  readTime: "10 min read",
  tags: ["Platform", "DevOps", "Architecture"],
  intro: [
    "Most teams that run Kubernetes already store manifests somewhere. Fewer teams treat that storage as the authoritative interface to production. The gap shows up the same way every time: someone runs `kubectl apply` from a laptop during an incident, the cluster drifts from what is in the repo, and the next deploy silently overwrites a hotfix nobody documented.",
    "GitOps closes that gap by making a simple claim: if the cluster should look like X, then X must be written down, reviewed, merged, and continuously enforced. Git is not just backup for YAML — it is the control plane. Controllers read from it and reconcile until reality matches intent. Humans stop being the deployment mechanism.",
    "That sounds like process hygiene. In practice it is systems architecture: you separate *what* should run (declarative specs in Git) from *how* it gets there (automated reconciliation), and you inherit audit trails, rollbacks, and blast-radius control as properties of the model rather than as afterthoughts bolted onto CI.",
  ],
  sections: [
    {
      id: "principles",
      label: "Section 01",
      heading: "The Four Principles That Actually Matter",
      paragraphs: [
        "The term GitOps was coined by Weaveworks in 2017, but the ideas are older: desired-state configuration, control loops, and infrastructure as data. What changed with Kubernetes is that the API object model made those ideas implementable without bespoke orchestration for every service.",
        "Four principles define the operating model. **Declarative**: the system is described as data (manifests, Helm values, Kustomize overlays), not as a sequence of imperative commands. **Versioned and immutable**: every intended state change is a commit; history is the audit log. **Pulled automatically**: software agents inside or beside the cluster fetch desired state and apply it — deploys are not SSH sessions or CI jobs with cluster-admin credentials. **Continuously reconciled**: controllers compare observed state to desired state on a loop and correct drift.",
        "If any one of those is missing, you have Git-backed ops, not GitOps. Storing manifests in Git while still deploying via `kubectl` from a pipeline is version control without reconciliation. Running a pull-based controller without declarative specs is automation without a contract. The model only holds when all four reinforce each other.",
      ],
    },
    {
      id: "reconciliation",
      label: "Section 02",
      heading: "Reconciliation Is the Core Mechanism",
      paragraphs: [
        "Kubernetes itself is built on reconciliation. A Deployment controller watches ReplicaSets; ReplicaSets watch Pods; the API server stores desired state, controllers drive actual state toward it. GitOps extends that pattern outward: the cluster's *configuration* is also desired state, and a dedicated controller (Argo CD, Flux, or equivalent) is responsible for keeping manifests applied.",
        "The loop is predictable. A developer changes a manifest or image tag in Git and opens a pull request. Reviewers see the diff — including rendered Helm output if you use diff tools in CI. After merge, the GitOps controller detects the new commit (webhook or poll), fetches manifests, renders templates if needed, and applies objects to the API server. The controller reports sync status: synced, progressing, or degraded. Drift — manual edits, failed partial applies, or resources created outside Git — surfaces as OutOfSync until someone fixes Git or explicitly allows the deviation.",
        "This is why GitOps scales better than pipeline-driven `kubectl apply` for steady-state operations. CI answers \"did the build pass and is the artifact publishable?\" GitOps answers \"does production still match the approved declaration?\" Those are different questions with different duty cycles. CI runs on events; reconciliation runs continuously.",
      ],
      diagramId: "gitops-reconcile-loop",
    },
    {
      id: "push-vs-pull",
      label: "Section 03",
      heading: "Push vs. Pull — Where Credentials Live",
      paragraphs: [
        "Classic CI/CD pushes change into environments: the pipeline holds kubeconfig or cloud credentials and applies manifests after tests pass. That works until you have many clusters, regulated networks, or a security team that refuses to put cluster-admin keys in GitHub Actions.",
        "GitOps inverts the trust direction. The cluster (or an agent with narrowly scoped in-cluster identity) pulls from Git. External CI does not need production credentials to deploy — it only needs permission to merge to the branch the controller watches. For air-gapped or private-cluster scenarios, a pull agent inside the boundary is often the only acceptable architecture.",
        "Push pipelines still have a role: building images, running unit tests, signing artifacts, and opening automated PRs that bump image tags in the GitOps repo. The handoff point is deliberate — CI produces immutable artifacts and updates Git; GitOps applies them. Blurring that boundary reintroduces the credential sprawl GitOps was meant to eliminate.",
      ],
      diagramId: "gitops-push-vs-pull",
    },
    {
      id: "repository-design",
      label: "Section 04",
      heading: "Repository Layout Is Architecture",
      paragraphs: [
        "How you structure Git repos determines blast radius, promotion flow, and who can change what. Two patterns dominate.",
        "**Monorepo for platform config**: one repository holds cluster addons, policies, and application overlays. Argo CD Application CRs point at paths; Kustomize bases and overlays encode dev → staging → prod differences. Promotion is often a PR that copies or retargets an image tag from staging overlay to prod overlay — human-gated, fully diffable.",
        "**App-of-apps / fleet repo**: a thin repo defines which Applications exist and which upstream repos they track. Application teams own service repos; platform owns the fleet repo that wires them to clusters. This scales organizational boundaries but requires strict contract tests so a team cannot merge a manifest that breaks shared policies.",
        "Helm charts, Kustomize, and plain YAML are implementation choices, not GitOps choices. What matters is that the rendered desired state for each environment is unambiguous, that overrides are explicit (not sed one-liners in CI), and that bootstrap — how the GitOps controller itself is installed — is documented and reproducible. You cannot GitOps your way out of a chicken-and-egg install; you can minimize it to a one-time seed.",
      ],
      table: {
        headers: ["Pattern", "Strength", "Risk"],
        rows: [
          [
            "Monorepo overlays",
            "Single PR shows full env diff; easy policy scanning",
            "Becomes large; needs CODEOWNERS and path-based review",
          ],
          [
            "App-of-apps fleet",
            "Clear platform vs. application ownership",
            "Cross-repo versioning; broken refs if tags move",
          ],
          [
            "Image tag bump PRs",
            "CI stays credential-light; deploy = merge",
            "Tag-only PRs hide config changes unless diff is enforced",
          ],
        ],
      },
    },
    {
      id: "tooling",
      label: "Section 05",
      heading: "Controllers, Not Vendors",
      paragraphs: [
        "Argo CD and Flux are the reference implementations most teams evaluate. Both watch Git (and optionally Helm OCI registries), maintain health/sync status, support multi-tenancy patterns, and integrate with policy engines. The differences are operational texture: Argo CD's UI and Application-centric model are familiar to teams that want visibility for operators; Flux's Git-native CRDs and tighter Helm/OCI story appeal to platform engineers who live in controllers and kustomize-controller logs.",
        "Neither tool replaces a secrets strategy. Sealed Secrets, SOPS-encrypted files, External Secrets Operator, or cloud secret stores are parallel decisions. GitOps assumes Git is safe to share with engineering — which means secrets do not belong in plaintext commits. Bootstrap tokens for the controller itself are the highest-value credential in the system; rotate them, scope RBAC narrowly, and treat the controller namespace as tier-zero infrastructure.",
        "Policy layers (OPA Gatekeeper, Kyverno) sit between apply and steady state: GitOps guarantees what was *requested* gets submitted; admission control guarantees what is *allowed* to run. The combination is stronger than either alone.",
      ],
      table: {
        headers: ["Concern", "Argo CD", "Flux"],
        rows: [
          ["Mental model", "Application → cluster mapping, rich UI", "Kustomization/HelmRelease CRs, kubectl-native"],
          ["Multi-tenancy", "Projects + RBAC in Argo", "Namespace-scoped controllers / IAM bindings"],
          ["OCI / Helm", "Supported via generators and plugins", "First-class helm-controller source"],
          ["Drift handling", "Auto-sync, self-heal, manual sync options", "Prune + reconcile interval on CRs"],
        ],
      },
    },
    {
      id: "boundaries",
      label: "Section 06",
      heading: "What GitOps Does Not Solve",
      paragraphs: [
        "GitOps governs *configuration state*, not *data state*. Database migrations, object storage lifecycle, and queue backlogs still need application-level strategies. Committing a Job manifest is not the same as guaranteeing idempotent schema migration across shards.",
        "Emergency break-glass still exists. The model assumes rare, audited deviations: disable auto-sync, apply a hotfix, fix Git, re-enable. Teams that break-glass weekly have a process problem GitOps will expose, not fix. Runbooks should say how to record the deviation and how soon Git must match reality again.",
        "Brownfield adoption is incremental. You do not move every Deployment on day one. Start with platform addons and stateless services, add sync policies, then tackle StatefulSets and CRDs with custom health checks. Controllers need custom resource health rules when your app is not \"Pod ready = healthy.\"",
        "Observability and cost are outside the loop. GitOps tells you production matches commit `a4f9c2`; it does not tell you latency regressed. Pair sync status with SLO dashboards and deployment markers so incidents correlate to merges, not just to pod restarts.",
      ],
      relatedArticle: {
        slug: "satops-procedure-tool",
        label: "Related: Designing SatOps — CI gates, deploy pipelines, and operational audit trails",
      },
    },
    {
      id: "adoption",
      label: "Section 07",
      heading: "A Practical Adoption Sequence",
      paragraphs: [
        "**Freeze the interface**: pick one environment, one repo layout, one controller. Document which branch maps to which cluster. Stop other deploy paths for that environment — exceptions require a ticket.",
        "**Render in CI**: run `kustomize build` or `helm template` in pull requests and post the diff. Reviewers approve rendered output, not just source edits. This catches overlay mistakes before merge.",
        "**Automate image promotion**: CI builds and pushes the image, then opens a PR that bumps only the tag field in the GitOps repo. Merge triggers deploy. Rollback is revert commit or cherry-pick previous tag — same mechanics as code rollback.",
        "**Add policy and drift alerts**: admission policies block unsafe manifests; OutOfSync alerts page on-call when someone kubectl-edits production. Treat OutOfSync as debt with a time box, not as normal.",
        "**Expand the fleet**: clone the pattern to additional clusters with the same controller install and different overlay paths. Platform work shifts from \"run deploy scripts\" to \"maintain the reconciliation contract.\"",
      ],
    },
  ],
  insight:
    "GitOps works when Git is the only socially acceptable way to change production configuration — not because the controller is magic, but because reconciliation turns merge history into operational truth. The goal is not more YAML. The goal is fewer undocumented differences between what you think is running and what actually is.",
};

export default article;
