import { Module } from '@/types';

export const reinforcementLearningModule: Module = {
  id: 'reinforcement-learning',
  number: 11,
  title: 'Reinforcement Learning & Decision Frontiers',
  subtitle: 'From MDPs and Bellman Optimality to Deep Q-Networks (DQN), PPO, and Large-Scale LLM Post-Training (GRPO)',
  iconName: 'Flame',
  color: '#f59e0b', // Amber
  chapters: [
    {
      id: 'mdp-formalism-value-functions',
      title: '11.1 Markov Decision Processes & The Bellman Equation',
      slug: 'mdp-formalism-value-functions',
      badge: 'RL Formalism',
      estimatedMinutes: 25,
      overview: 'Deconstruct MDP tuples, discounted cumulative returns, state-value V(s), action-value Q(s, a), and the Bellman Optimality Equation.',
      prerequisites: ['Probability', 'Linear Algebra'],
      sections: [
        {
          id: 'mdp-bellman-derivation',
          title: 'Markov Decision Processes & Bellman Optimality',
          subtitle: 'How Temporal Difference Learning Approximates Dynamic Programming Recursively',
          content: `An agent interacts with an environment modeled as a 5-tuple MDP $\\langle \\mathcal{S}, \\mathcal{A}, \\mathcal{P}, \\mathcal{R}, \\gamma \\rangle$:
- $\\mathcal{S}$: State space
- $\\mathcal{A}$: Action space
- $\\mathcal{P}(s'|s, a)$: Transition probability function
- $\\mathcal{R}(s, a)$: Immediate reward function
- $\\gamma \\in [0, 1)$: Future reward discount factor

The **Bellman Optimality Equation** for optimal action-value $Q^*(s, a)$ is:
$$Q^*(s, a) = R(s, a) + \\gamma \\sum_{s' \\in \\mathcal{S}} P(s' | s, a) \\max_{a'} Q^*(s', a')$$

### Banach Fixed-Point Theorem & Contraction Mapping
The Bellman optimality operator $\\mathcal{T}^*$ is a $\\gamma$-contraction mapping in the $\\infty$-norm:
$$\\|\\mathcal{T}^* Q_1 - \\mathcal{T}^* Q_2\\|_\\infty \\le \\gamma \\|Q_1 - Q_2\\|_\\infty$$
Because $\\gamma < 1$, iteratively applying $\\mathcal{T}^*$ is **mathematically guaranteed to converge to a unique optimal value function $Q^*$**!`,
          equations: [
            {
              latex: 'V^*(s) = \\max_{a \\in \\mathcal{A}} \\left[ R(s, a) + \\gamma \\sum_{s\' \\in \\mathcal{S}} P(s\' | s, a) V^*(s\') \\right]',
              description: 'Bellman Optimality Equation for State-Value Function.'
            },
            {
              latex: 'G_t = \\sum_{k=0}^{\\infty} \\gamma^k R_{t+k+1}',
              description: 'Discounted cumulative return from timestep t.'
            }
          ],
          keyTakeaways: [
            'Bellman equations decompose cumulative future return into immediate reward plus discounted value of next state.',
            'Value iteration is a contraction mapping with a unique fixed point (Banach Fixed-Point Theorem).',
            'Optimal policies are greedy with respect to the optimal action-value function Q*(s, a).'
          ]
        }
      ]
    },
    {
      id: 'value-based-dqn-variants',
      title: '11.2 Value-Based Methods: Q-Learning & Deep Q-Networks (DQN)',
      slug: 'value-based-dqn-variants',
      badge: 'Value-Based RL',
      estimatedMinutes: 25,
      overview: 'Temporal Difference (TD-0) learning, Q-Learning, Deep Q-Networks (DQN), Experience Replay, Target Networks, and Double DQN.',
      prerequisites: ['MDPs', 'Neural Networks'],
      sections: [
        {
          id: 'dqn-stability-mechanics',
          title: 'Deep Q-Networks & Overestimation Bias Solutions',
          subtitle: 'Why Replay Buffers and Target Networks Stabilize Deep Reinforcement Learning',
          content: `In standard Q-learning, tabular updates $Q(s, a) \\leftarrow Q(s, a) + \\alpha (r + \\gamma \\max_{a'} Q(s', a') - Q(s, a))$ fail in continuous spaces.

**Deep Q-Networks (DQN)** parameterize $Q(s, a; \\theta)$ with a neural network. To break deadly feedback loops and non-i.i.d. correlations, DQN uses:
1. **Target Network $\\theta^-$**: Frozen periodic weights to stabilize the TD target $y_i = r + \\gamma \\max_{a'} Q(s', a'; \\theta^-)$.
2. **Experience Replay Buffer $\\mathcal{D}$**: Breaks temporal correlations between successive transitions.

### Double DQN (Van Hasselt et al. 2015)
Standard DQN suffers from positive maximization bias due to $\\max_{a'} Q(s', a')$. Double DQN decouples action selection from action evaluation:
$$y_i^{\\text{Double}} = r + \\gamma Q\\left(s', \\arg\\max_a Q(s', a; \\theta); \\theta^-\\right)$$`,
          equations: [
            {
              latex: "\\mathcal{L}_{\\text{DQN}}(\\theta) = \\mathbb{E}_{(s, a, r, s') \\sim \\mathcal{D}} \\left[ \\left( r + \\gamma \\max_{a'} Q(s', a'; \\theta^-) - Q(s, a; \\theta) \\right)^2 \\right]",
              description: 'DQN Mean Squared Bellman Error Loss.'
            }
          ],
          keyTakeaways: [
            'Experience replay buffers break temporal correlation and enable sample-efficient mini-batch gradient descent.',
            'Target networks prevent moving-target instability during Bellman error minimization.',
            'Double DQN eliminates overestimation bias by using online weights for selection and target weights for evaluation.'
          ],
          recommendedPapers: [
            {
              title: 'Human-level control through deep reinforcement learning (DQN)',
              authors: 'Volodymyr Mnih, Koray Kavukcuoglu, David Silver, et al.',
              year: 2015,
              url: 'https://www.nature.com/articles/nature14236',
              significance: 'Pioneered deep reinforcement learning achieving human-level performance on Atari games.'
            }
          ]
        }
      ]
    },
    {
      id: 'policy-gradients-ppo-sac',
      title: '11.3 Policy Gradients: REINFORCE, Actor-Critic & PPO',
      slug: 'policy-gradients-ppo-sac',
      badge: 'Policy Optimization',
      estimatedMinutes: 30,
      overview: 'Derive the Policy Gradient Theorem (REINFORCE), Generalized Advantage Estimation (GAE), and Proximal Policy Optimization (PPO).',
      prerequisites: ['Multivariate Calculus', 'MDPs'],
      sections: [
        {
          id: 'ppo-clipping-derivation',
          title: 'Proximal Policy Optimization (PPO) & Clipped Surrogate Objectives',
          subtitle: 'Why Trust Region Clipping Prevents Destructive Policy Collapse in Continuous Control',
          content: `### 1. The Policy Gradient Theorem
Directly optimizes parameterized policy $\\pi_\\theta(a|s)$ to maximize expected return $J(\\theta) = \\mathbb{E}_{\\tau \\sim \\pi_\\theta}[R(\\tau)]$:
$$\\nabla_\\theta J(\\theta) = \\mathbb{E}_{\\tau \\sim \\pi_\\theta} \\left[ \\sum_{t=0}^T \\nabla_\\theta \\log \\pi_\\theta(a_t | s_t) A^{\\pi}(s_t, a_t) \\right]$$

### 2. Proximal Policy Optimization (PPO: Schulman et al. 2017)
Large gradient steps can ruin a policy catastrophically. PPO constrains policy updates within a trust region by clipping the probability ratio $r_t(\\theta) = \\frac{\\pi_\\theta(a_t | s_t)}{\\pi_{\\theta_{\\text{old}}}(a_t | s_t)}$:

$$\\mathcal{L}^{\\text{CLIP}}(\\theta) = \\hat{\\mathbb{E}}_t \\left[ \\min\\left( r_t(\\theta) \\hat{A}_t, \\text{clip}(r_t(\\theta), 1-\\epsilon, 1+\\epsilon) \\hat{A}_t \\right) \\right]$$
where $\\epsilon \\approx 0.2$. If advantage $\\hat{A}_t > 0$, the update increases action probability only up to $(1+\\epsilon)$, preventing oversized updates!`,
          equations: [
            {
              latex: 'r_t(\\theta) = \\frac{\\pi_\\theta(a_t | s_t)}{\\pi_{\\text{old}}(a_t | s_t)}, \\quad \\epsilon \\approx 0.1 - 0.2',
              description: 'PPO Importance Sampling Ratio.'
            }
          ],
          tradeoffs: [
            {
              feature: 'RL Algorithm Class',
              currentApproach: 'Proximal Policy Optimization (PPO / Clipped Surrogate)',
              alternativeApproach: 'Deep Q-Networks (DQN)',
              whyThis: 'Handles high-dimensional and continuous action spaces naturally; stable convergence in LLM alignment.',
              whyNotOther: 'DQN cannot directly optimize continuous action spaces without discretization.',
              whenToUse: 'Robotics continuous control, game AI, LLM reinforcement learning.'
            }
          ],
          keyTakeaways: [
            'Policy gradient methods optimize actions directly without requiring intermediate value tables.',
            'Advantage functions A(s, a) = Q(s, a) - V(s) dramatically reduce variance without adding bias.',
            'PPO clipping establishes the gold standard for robust continuous control and LLM post-training.'
          ],
          recommendedPapers: [
            {
              title: 'Proximal Policy Optimization Algorithms (PPO)',
              authors: 'John Schulman, Filip Wolski, Prafulla Dhariwal, Alec Radford, Oleg Klimov',
              year: 2017,
              arxivId: '1707.06347',
              url: 'https://arxiv.org/abs/1707.06347',
              significance: 'Standardized policy gradient training across robotics, continuous control, and LLM reinforcement learning.'
            }
          ]
        }
      ]
    },
    {
      id: 'rl-in-llms-grpo-reasoning',
      title: '11.4 Reinforcement Learning in Modern LLMs (PPO vs GRPO)',
      slug: 'rl-in-llms-grpo-reasoning',
      badge: 'RL in Foundation Models',
      estimatedMinutes: 30,
      overview: 'Reward Modeling, PPO in RLHF, and Group Relative Policy Optimization (GRPO) for emergent mathematical and coding reasoning (DeepSeek-R1).',
      prerequisites: ['PPO', 'Transformer Architecture'],
      sections: [
        {
          id: 'grpo-reasoning-emergence',
          title: 'Group Relative Policy Optimization (GRPO) in Reasoning Models',
          subtitle: 'Eliminating the Critic Model to Scale RL Training on 100B+ Foundation Models',
          content: `In traditional Actor-Critic RLHF, training a 70B policy requires a **70B Actor, 70B Critic, 70B Reference Model, and 70B Reward Model**, demanding 4 copies in GPU VRAM!

### Group Relative Policy Optimization (GRPO: Shao et al. 2024)
GRPO completely **removes the Critic model**. For each prompt $q$, it samples a group of $G$ independent candidate responses $\\{o_1, o_2, \\dots, o_G\\}$ from the current policy $\\pi_\\theta$.

The advantage $A_i$ for candidate $o_i$ is computed relative to the group statistics:
$$A_i = \\frac{r_i - \\text{mean}(\\{r_1, \\dots, r_G\\})}{\\text{std}(\\{r_1, \\dots, r_G\\})}$$

Using simple rule-based binary reward verifiers (compiler execution, math correctness), GRPO scales RL training to thousands of nodes, triggering emergent chain-of-thought verification!`,
          equations: [
            {
              latex: '\\mathcal{L}_{\\text{GRPO}}(\\theta) = \\frac{1}{G}\\sum_{i=1}^G \\min\\left( \\frac{\\pi_\\theta(o_i|q)}{\\pi_{\\text{old}}(o_i|q)} A_i, \\text{clip}\\left(\\frac{\\pi_\\theta(o_i|q)}{\\pi_{\\text{old}}(o_i|q)}, 1-\\epsilon, 1+\\epsilon\\right) A_i \\right) - \\beta D_{\\text{KL}}(\\pi_\\theta \\parallel \\pi_{\\text{ref}})',
              description: 'GRPO objective function used in DeepSeekMath and DeepSeek-R1.'
            }
          ],
          keyTakeaways: [
            'GRPO calculates relative advantages from a group of sampled responses, eliminating the memory-heavy Critic network.',
            'Verifiable reward environments (math/code) enable pure RL without noisy human preference models.',
            'Long-horizon test-time search and reasoning emerge directly through RL exploration.'
          ],
          recommendedPapers: [
            {
              title: 'DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models',
              authors: 'Zhihong Shao, Peiyi Wang, Qihao Zhu, et al.',
              year: 2024,
              arxivId: '2402.03300',
              url: 'https://arxiv.org/abs/2402.03300',
              significance: 'Invented Group Relative Policy Optimization (GRPO), eliminating Critic networks in LLM RL.'
            }
          ]
        }
      ]
    }
  ]
};
