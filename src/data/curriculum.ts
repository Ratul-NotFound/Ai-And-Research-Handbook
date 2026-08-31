import { Module } from '@/types';
import { csResearchMethodologyModule } from './modules/cs-research-methodology';
import { csDataResearchModule } from './modules/cs-data-research';
import { csModelsTrainingModule } from './modules/cs-models-training';
import { csErrorReductionModule } from './modules/cs-error-reduction';
import { csResultAnalysisModule } from './modules/cs-result-analysis';
import { csDecisionFrameworkModule } from './modules/cs-decision-framework';
import { classicalMlModule } from './modules/classical-ml';
import { deepLearningModule } from './modules/deep-learning';
import { nplLlmsModule } from './modules/nlp-llms';
import { modernAiAgentsModule } from './modules/modern-ai-agents';
import { computerVisionModule } from './modules/computer-vision';
import { reinforcementLearningModule } from './modules/reinforcement-learning';
import { linearAlgebraModule } from './modules/linear-algebra';
import { calculusOptimizationModule } from './modules/calculus-optimization';
import { probabilityStatisticsModule } from './modules/probability-statistics';

export const AI_CURRICULUM: Module[] = [
  csResearchMethodologyModule,
  csDataResearchModule,
  csModelsTrainingModule,
  csErrorReductionModule,
  csResultAnalysisModule,
  csDecisionFrameworkModule,
  classicalMlModule,
  deepLearningModule,
  modernAiAgentsModule,
  nplLlmsModule,
  computerVisionModule,
  reinforcementLearningModule,
  linearAlgebraModule,
  calculusOptimizationModule,
  probabilityStatisticsModule,
];
