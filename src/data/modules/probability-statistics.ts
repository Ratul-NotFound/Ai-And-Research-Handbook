import { Module } from '@/types';

export const probabilityStatisticsModule: Module = {
  id: 'probability-statistics',
  number: 14,
  title: 'Probability, Statistics & Information Theory',
  subtitle: 'From Bayesian Likelihood and Gaussian MSE to Shannon Entropy and KL Divergence Minimization',
  iconName: 'Sigma',
  color: '#3b82f6', // Blue
  chapters: [
    {
      id: 'mle-bayesian-inference',
      title: '14.1 Maximum Likelihood Estimation (MLE) & Bayesian Inference',
      slug: 'mle-bayesian-inference',
      badge: 'Statistical Foundations',
      estimatedMinutes: 25,
      overview: 'Deconstruct probability distributions, Bayes Rule, Maximum A Posteriori (MAP), Maximum Likelihood Estimation (MLE), and why Mean Squared Error corresponds to Gaussian MLE.',
      prerequisites: ['Basic Probability', 'Derivatives'],
      sections: [
        {
          id: 'mle-gaussian-loss',
          title: 'Maximum Likelihood & Connection to Regression Losses',
          subtitle: 'Why Mean Squared Error (MSE) is Identical to Gaussian Log-Likelihood',
          content: `Given independent and identically distributed (i.i.d.) observations $\\mathcal{D} = \\{x_i, y_i\\}_{i=1}^N$, Maximum Likelihood Estimation (MLE) finds parameters $\\theta$ that maximize the probability of the observed data:
$$\\hat{\\theta}_{\\text{MLE}} = \\arg\\max_\\theta \\prod_{i=1}^N P(y_i | x_i; \\theta) = \\arg\\min_\\theta -\\sum_{i=1}^N \\log P(y_i | x_i; \\theta)$$

### Deriving Mean Squared Error from a Gaussian Prior
Assume the target $y$ is corrupted by zero-mean Gaussian noise $\\epsilon \\sim \\mathcal{N}(0, \\sigma^2)$:
$$y = f(x; \\theta) + \\epsilon \\implies P(y | x; \\theta) = \\frac{1}{\\sqrt{2\\pi \\sigma^2}} \\exp\\left( -\\frac{(y - f(x; \\theta))^2}{2\\sigma^2} \\right)$$

Taking the negative log-likelihood:
$$-\\log P(y | x; \\theta) = \\frac{1}{2\\sigma^2} (y - f(x; \\theta))^2 + \\frac{1}{2}\\log(2\\pi\\sigma^2)$$

Minimizing this negative log-likelihood is **mathematically identical to minimizing the Mean Squared Error (MSE) $(y - f(x; \\theta))^2$**!`,
          equations: [
            {
              latex: '\\mathcal{L}_{\\text{NLL}}(\\theta) = -\\sum_{i=1}^N \\log P(y_i | x_i; \\theta)',
              description: 'General Negative Log-Likelihood (NLL) loss formulation.'
            },
            {
              latex: 'P(\\theta | \\mathcal{D}) = \\frac{P(\\mathcal{D} | \\theta) P(\\theta)}{P(\\mathcal{D})} \\quad (\\text{Bayes Theorem})',
              description: 'Posterior probability balancing data likelihood and prior beliefs.'
            }
          ],
          tradeoffs: [
            {
              feature: 'Estimation Principle',
              currentApproach: 'Maximum A Posteriori (MAP with Gaussian Prior)',
              alternativeApproach: 'Maximum Likelihood Estimation (MLE without Prior)',
              whyThis: 'MAP corresponds directly to L2 Weight Decay (Ridge Regularization), preventing parameter explosion.',
              whyNotOther: 'Unregularized MLE easily overfits when parameters exceed data sample size.',
              whenToUse: 'Foundation model training, deep neural network regularization.'
            }
          ],
          keyTakeaways: [
            'All standard loss functions (MSE, MAE, Cross-Entropy) are direct negative log-likelihoods under specific probability distributions.',
            'L2 weight decay is mathematically equivalent to placing a zero-mean Gaussian prior over weights in MAP estimation.',
            'L1 Lasso regularization corresponds to a Laplacian prior over weights.'
          ]
        }
      ]
    },
    {
      id: 'information-theory-entropy-kl',
      title: '14.2 Information Theory: Shannon Entropy, Cross-Entropy & KL Divergence',
      slug: 'information-theory-entropy-kl',
      badge: 'Information Rigor',
      estimatedMinutes: 25,
      overview: 'Understand self-information, Shannon Entropy, Cross-Entropy, Kullback-Leibler (KL) Divergence, forward vs reverse KL, and Temperature scaling.',
      prerequisites: ['Probability Distributions', 'Logarithms'],
      sections: [
        {
          id: 'entropy-cross-entropy-equivalence',
          title: 'Shannon Entropy, Cross-Entropy & Relative Entropy',
          subtitle: 'Why Cross-Entropy is Equivalent to Minimizing Information Surprise',
          content: `Information theory quantifies surprise. An event $x$ occurring with probability $P(x)$ yields $I(x) = -\\log_2 P(x)$ bits of information.

The **Shannon Entropy** measures average expected uncertainty:
$$H(P) = - \\sum_{x} P(x) \\log P(x)$$

The **Kullback-Leibler (KL) Divergence** measures information loss when approximating true distribution $P$ with model distribution $Q$:
$$D_{\\text{KL}}(P \\parallel Q) = \\sum_{x} P(x) \\log \\frac{P(x)}{Q(x)} = H(P, Q) - H(P)$$

Because true data entropy $H(P)$ is constant with respect to model parameters $\\theta$:
$$\\arg\\min_\\theta H(P, Q_\\theta) \\equiv \\arg\\min_\\theta D_{\\text{KL}}(P \\parallel Q_\\theta)$$
Minimizing Cross-Entropy is mathematically identical to minimizing KL divergence!`,
          equations: [
            {
              latex: 'D_{\\text{KL}}(P \\parallel Q) = \\mathbb{E}_{x \\sim P}\\left[ \\log \\frac{P(x)}{Q(x)} \\right] \\ge 0',
              description: 'Non-negativity of KL divergence (Gibbs Inequality).'
            },
            {
              latex: 'P_i = \\frac{\\exp(z_i / T)}{\\sum_j \\exp(z_j / T)}',
              description: 'Softmax temperature scaling controlling output probability entropy.'
            }
          ],
          tradeoffs: [
            {
              feature: 'KL Divergence Direction',
              currentApproach: 'Forward KL: $D_{\\text{KL}}(P \\parallel Q)$ (Mode-Covering)',
              alternativeApproach: 'Reverse KL: $D_{\\text{KL}}(Q \\parallel P)$ (Mode-Seeking)',
              whyThis: 'Forward KL forces model $Q$ to cover all modes of data distribution $P$ (zero-avoiding).',
              whyNotOther: 'Reverse KL concentrates on a single dominant mode (used in model distillation and DPO alignment).',
              whenToUse: 'Supervised pre-training (Forward KL) vs LLM reasoning distillation (Reverse KL).'
            }
          ],
          keyTakeaways: [
            'Cross-Entropy loss = True Data Entropy + KL Divergence.',
            'Temperature scaling z/T controls output distribution entropy: low T sharpens onto argmax, high T flattens towards uniform randomness.',
            'Forward KL covers all modes, whereas Reverse KL seeks single high-confidence modes.'
          ],
          recommendedPapers: [
            {
              title: 'A Mathematical Theory of Communication',
              authors: 'Claude E. Shannon',
              year: 1948,
              url: 'https://ieeexplore.ieee.org/document/6773024',
              significance: 'The landmark paper that founded information theory, entropy, and digital communications.'
            }
          ]
        }
      ]
    }
  ]
};
