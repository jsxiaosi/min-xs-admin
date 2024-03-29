<script setup lang="ts">
  import type { PropType } from 'vue';
  import { computed, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import SidebarItem from './SidebarItem.vue';
  import { usePermissionStoreHook } from '@/store/modules/permission';
  import type { AppRouteRecordRaw } from '@/router/type';
  import { getParentPaths, findRouteByPath } from '@/router/utils';
  import { useRootSetting } from '@/hooks/setting/useRootSetting';

  defineProps({
    mode: {
      type: String as PropType<'vertical' | 'horizontal'>,
      default: 'vertical',
    },
  });

  const permission = usePermissionStoreHook();

  const route = useRoute();
  const { appConfig } = useRootSetting();
  let subMenuData = ref<AppRouteRecordRaw[]>(permission.wholeMenus);

  const menuData = computed<AppRouteRecordRaw[]>(() => {
    return appConfig.value.sidebarMode === 'blend' && !appConfig.value.drawerSidebar
      ? subMenuData.value
      : permission.wholeMenus;
  });

  function getSubMenuData(path: string) {
    // path的父级路由组成的数组
    const parentPathArr = getParentPaths(path, permission.wholeMenus);
    // 当前路由的信息
    const parenetRoute = findRouteByPath(parentPathArr[0], permission.wholeMenus);
    if (parenetRoute) {
      if (parenetRoute.children && !parenetRoute.children[0].meta?.hideSidebar)
        subMenuData.value = parenetRoute.children;
      else subMenuData.value = [parenetRoute];
    }
  }

  getSubMenuData(route.path);
  watch(
    () => [route.path, appConfig.value.sidebarMode],
    () => {
      if (appConfig.value.sidebarMode === 'blend') {
        getSubMenuData(route.path);
      }
    },
  );

  const activeMenyu = computed<string>(() => {
    const { meta, path } = route;
    if (meta.activeMenu) {
      return meta.activeMenu as string;
    }
    return path;
  });
</script>

<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="activeMenyu"
      :unique-opened="true"
      :collapse="appConfig.sidebarMode === 'horizontal' ? false : appConfig.collapseMenu"
      :mode="mode"
    >
      <SidebarItem
        v-for="menuRoute in menuData"
        :key="menuRoute.path"
        :item="menuRoute"
        :is-nest="false"
        :base-path="menuRoute.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<style lang="scss" scoped></style>
