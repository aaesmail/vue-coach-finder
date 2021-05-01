import { defineAsyncComponent } from 'vue';

import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';

const BaseDialog = defineAsyncComponent(() =>
  import('./components/ui/BaseDialog.vue')
);

export default {
  'base-card': BaseCard,
  'base-button': BaseButton,
  'base-badge': BaseBadge,
  'base-spinner': BaseSpinner,
  'base-dialog': BaseDialog,
};
