import { BasicStatus, PermissionType } from './enum';

/**
 * 用户令牌信息
 */
export interface UserToken {
  /**
   * 访问令牌
   */
  accessToken?: string;
  /**
   * 刷新令牌
   */
  refreshToken?: string;
}

/**
 * 用户信息
 */
export interface UserInfo {
  /**
   * 用户 ID
   */
  id: string;
  /**
   * 用户邮箱
   */
  email: string;
  /**
   * 用户名
   */
  username: string;
  /**
   * 用户密码（可选）
   */
  password?: string;
  /**
   * 用户头像（可选）
   */
  avatar?: string;
  /**
   * 用户角色（可选）
   */
  role?: Role;
  /**
   * 用户状态（启用/禁用）
   */
  status?: BasicStatus;
  /**
   * 用户权限列表（可选）
   */
  permissions?: Permission[];
}

/**
 * 组织信息
 */
export interface Organization {
  /**
   * 组织 ID
   */
  id: string;
  /**
   * 组织名称
   */
  name: string;
  /**
   * 组织状态（启用/禁用）
   */
  status: 'enable' | 'disable';
  /**
   * 组织描述（可选）
   */
  desc?: string;
  /**
   * 组织排序（可选）
   */
  order?: number;
  /**
   * 子组织列表（可选）
   */
  children?: Organization[];
}

/**
 * 权限信息
 */
export interface Permission {
  /**
   * 权限 ID
   */
  id: string;
  /**
   * 父级权限 ID
   */
  parentId: string;
  /**
   * 权限名称
   */
  name: string;
  /**
   * 权限标签
   */
  label: string;
  /**
   * 权限类型（目录、菜单、按钮）
   */
  type: PermissionType;
  /**
   * 路由路径
   */
  route: string;
  /**
   * 权限状态（启用/禁用，可选）
   */
  status?: BasicStatus;
  /**
   * 权限排序（可选）
   */
  order?: number;
  /**
   * 权限图标（可选）
   */
  icon?: string;
  /**
   * 组件路径（可选）
   */
  component?: string;
  /**
   * 是否隐藏菜单（可选）
   */
  hide?: boolean;
  /**
   * 是否隐藏标签页（可选）
   */
  hideTab?: boolean;
  /**
   * 嵌套外部框架的 URL（可选）
   */
  frameSrc?: string;
  /**
   * 是否为新功能（可选）
   */
  newFeature?: boolean;
  /**
   * 子权限列表（可选）
   */
  children?: Permission[];
}

/**
 * 角色信息
 */
export interface Role {
  /**
   * 角色 ID
   */
  id: string;
  /**
   * 角色名称
   */
  name: string;
  /**
   * 角色标签
   */
  label: string;
  /**
   * 角色状态（启用/禁用）
   */
  status: BasicStatus;
  /**
   * 角色排序（可选）
   */
  order?: number;
  /**
   * 角色描述（可选）
   */
  desc?: string;
  /**
   * 角色拥有的权限列表（可选）
   */
  permission?: Permission[];
}
