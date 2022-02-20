import Media from 'react-media';
import MobileTable from './MobileTable';
import DesktopTable from './DesktopTable';

import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from 'redux/transactionsTable/transactionsTableOperations';
import getTransactionsTable from 'redux/transactionsTable/transactionsTableSelectors';
import { useEffect } from 'react';

export default function TableHome() {
  const dispatch = useDispatch();
  const data = useSelector(getTransactionsTable);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <Media query="(max-width: 768px)">
      {(matches) =>
        matches ? <MobileTable data={data} /> : <DesktopTable data={data} />
      }
    </Media>
  );
}