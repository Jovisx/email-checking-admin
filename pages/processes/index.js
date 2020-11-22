import React, { useEffect, useState } from 'react';
import { useTranslation } from 'i18n';
import { useDispatch, useSelector } from 'react-redux';

import { processesActions } from 'store/actions';
import { fromProcesses } from 'store/selectors';

import MainLayout from 'layouts/MainLayout';
import ProcessesTable from 'components/processes/ProcessesTable';

const ProcessesPage = () => {
  const { t } = useTranslation('language');

  const dispatch = useDispatch();
  const getData = params => dispatch(processesActions.getProcessesRequest(params));

  const processes = useSelector(fromProcesses.processes);
  const processesStatus = useSelector(fromProcesses.processesStatus);

  const [search, setSearch] = useState({
    offset: 0,
    limit: 16,
    LastEvaluatedKey: processes.LastEvaluatedKey
  });

  const handleQuery = params => {
    setSearch({ ...search, ...params });
    getData({ ...search, ...params });
  };

  useEffect(() => {
    getData(search);
  }, []);

  return (
    <MainLayout title={t('processes.title')}>
      <ProcessesTable
        data={processes}
        loading={processesStatus === 'running'}
        onQuery={handleQuery}
      />
    </MainLayout>
  );
};

export default ProcessesPage;
