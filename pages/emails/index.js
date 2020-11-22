import React, { useEffect, useState } from 'react';
import { useTranslation } from 'i18n';
import { useDispatch, useSelector } from 'react-redux';

import { emailsActions } from 'store/actions';
import { fromEmails } from 'store/selectors';

import MainLayout from 'layouts/MainLayout';
import EmailsTable from 'components/emails/EmailsTable';

const EmailsPage = () => {
  const { t } = useTranslation('language');

  const dispatch = useDispatch();
  const getData = params => dispatch(emailsActions.getEmailsRequest(params));

  const emails = useSelector(fromEmails.emails);
  const emailsStatus = useSelector(fromEmails.emailsStatus);

  const [search, setSearch] = useState({
    offset: 0, 
    limit: 16,
    LastEvaluatedKey: null
  });

  const handleQuery = params => {
    let calldata = params;
    calldata.LastEvaluatedKey = emails.LastEvaluatedKey;
    setSearch({ ...search, ...calldata });
    getData({ ...search, ...params });
  };

  useEffect(() => {
    getData(search);
  }, []);

  return (
    <MainLayout title={t('emails.title')}>
      <EmailsTable
        data={emails}
        loading={emailsStatus === 'running'}
        onQuery={handleQuery}
      />
    </MainLayout>
  );
};

export default EmailsPage;
