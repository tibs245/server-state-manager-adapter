import { serverStateManager } from '@/networkConfiguration.ts';
import { useServerStateQuery } from '@server-state-manager-adapter/react';
import { yesOrNoRequest } from '../requests/yesOrNoRequest.ts';

export const YesOrNoComponent = () => {
  const { data, isLoading } = useServerStateQuery({ serverStateManager, request: yesOrNoRequest });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (data === true) {
    return <strong className="color: green">YES</strong>;
  } else if (data === false) {
    return <strong className="color: red">NO</strong>;
  } else {
    return <strong>WTF</strong>;
  }
};
