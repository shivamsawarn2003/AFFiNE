import type {
  events as helperEvents,
  handlers as helperHandlers,
} from '@affine/electron/helper/exposed';
import type {
  events as mainEvents,
  handlers as mainHandlers,
} from '@affine/electron/main/exposed';
import type {
  affine as exposedAffineGlobal,
  appInfo as exposedAppInfo,
} from '@affine/electron/preload/electron-api';

type MainHandlers = typeof mainHandlers;
type HelperHandlers = typeof helperHandlers;
type HelperEvents = typeof helperEvents;
type MainEvents = typeof mainEvents;
type ClientHandler = {
  [namespace in keyof MainHandlers]: {
    [method in keyof MainHandlers[namespace]]: MainHandlers[namespace][method] extends (
      arg0: any,
      ...rest: infer A
    ) => any
      ? (...args: A) => Promise<ReturnType<MainHandlers[namespace][method]>>
      : never;
  };
} & HelperHandlers;
type ClientEvents = MainEvents & HelperEvents;

export const appInfo = (window as any).appInfo as typeof exposedAppInfo | null;
export const apis = (window as any).apis as ClientHandler | null;
export const events = (window as any).events as ClientEvents | null;
export const affine = (window as any).affine as
  | typeof exposedAffineGlobal
  | null;

export type { UpdateMeta } from '@affine/electron/main/updater/event';
