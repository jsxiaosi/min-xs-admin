<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { ElButton } from 'element-plus';
  import SvgIcon from '@/components/SvgIcon/index.vue';

  const router = useRouter();
  const toHome = () => {
    router.push('/');
  };
</script>

<template>
  <div class="error-container">
    <div class="error-icon">
      <SvgIcon name="error-500" class-name="icon"></SvgIcon>
    </div>
    <div class="text">
      <span>{{ $t('error-page.500.title') }}</span>
    </div>
    <div class="description">{{ $t('error-page.500.description') }}</div>

    <ElButton type="primary" @click="toHome">{{ $t('error-page.back') }}</ElButton>
  </div>
</template>

<style lang="scss" scoped>
  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 88px;
    width: 100%;
    height: 100%;

    .error-icon {
      // font-size: 80px;
      color: var(--main-color);

      .icon {
        width: 260px;
        height: 95px;

        :deep(svg) {
          width: 100%;
          height: 100%;
        }
      }
    }

    .text {
      margin-top: 24px;
      color: var(--text-color-regular);
      font-size: var(--font-size-extra-large);
      font-weight: 700;
      text-align: center;
    }

    .description {
      color: var(--text-color-regular);
      font-weight: 400;
      font-size: var(--font-size-base);
      margin: 24px 0;
    }
  }
</style>
