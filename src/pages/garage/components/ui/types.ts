import type { PageActionType } from "./reducer";
type IProps = {
	emit: (type: PageActionType, payload?: any) => void;
};

export type { IProps };
