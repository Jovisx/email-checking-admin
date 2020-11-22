import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation, Link } from 'i18n';

import Table from 'components/widgets/Table';
import Pagination from 'components/widgets/Pagination';

const EmailsWrapper = styled.div`
  background-color: var(--color-white);
  box-shadow: var(--box-shadow-main);
  .paper-body {
    padding-bottom: 15px;
    margin: 0 20px;
  }
  .rt-table {
    .rt-td {
      color: var(--color-text-dark);
    }
    .rt-td:hover {
      color: var (--color-title-secondary) !important;
    }
    .rt-td.id {
      img {
        width: 24px;
        height: 24px;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
    .rt-td.last_column {
      .enabled {
        color: var(--color-blue);
      }
      .disabled {
        color: var(--color-yellow);
      }
      .blocked {
        color: var(--color-text-primary);
      }
    }
    .rt-td.last_column {
      position: relative;
      overflow: visible;
      .percent {
        background: var(--color-bg-secondary);
        margin-left: 2px;
        padding: 5px;
      }
      .actions {
        border: none;
        background: var(--color-primary);
        color: var(--color-white);
        cursor: pointer;
        font-size: 16px;
        font-weight: 500;
        line-height: 22px;
        min-width: 144px;
        outline: none;
        padding: 14px 16px;
        position: relative;
        text-transform: uppercase;
        vertical-align: top;

        &.medium:hover {
          box-shadow: 0 6px 21px -6px var(--color-primary);
        }
        &.small:hover {
          box-shadow: 0 6px 15px -6px var(--color-primary);
        }

        &:active {
          background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%);
        }

        &.medium {
          font-size: 14px;
          line-height: 16px;
          min-width: 100px;
          padding: 10px 8px;
        }

        &.small {
          font-size: 12px;
          line-height: 18px;
          min-width: 100px;
          padding: 6px 10px;
        }
      }
    }
  }
`;

const EmailFilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 20px 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  border-bottom: var(--border-bottom-main);

  .total_emails_wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 12px;

    .p-large {
      color: var(--color-title-primary);
      margin-right: 8px;
    }

    .p-xsmall {
      text-transform: uppercase;
    }

    .total_count {
      color: var(--color-blue);
      font-weight: 500;
      margin-left: 3px;
    }
  }
`;

const pageSizeOptions = [
  { value: 5, label: 5 },
  { value: 10, label: 10 },
  { value: 16, label: 16 },
];


const EmailsTable = ({ data, loading, onQuery }) => {
  const { emails = [], total = 0, offset = 0, limit: pageSize = 16 } = data;
  const page = Math.round(offset / pageSize) + 1;
  const { t } = useTranslation('language');

  const columns = [
    {
      id: 'id',
      Header: t('emails.id'),
      accessor: email => email.id,
      minWidth: 100
    },
    {
      id: 'subject',
      Header: t('emails.subject'),
      accessor: email => email.subject,
      minWidth: 150
    },
    {
      id: 'status',
      Header: t('emails.status'),
      accessor: email => email.status,
      minWidth: 100
    },
    {
      id: 'date',
      Header: t('emails.date'),
      accessor: email => email.createdAt,
      minWidth: 100
    },
    {
      id: 'emailLead',
      Header: t('emails.emailLead'),
      accessor: email => email.emailLead,
      minWidth: 100
    },
    {
      id: 'resolvedBy',
      Header: t('emails.resolvedBy'),
      accessor: email => email.resolvedBy,
      minWidth: 100
    },
    {
      id: 'action',
      Header: t('emails.action'),
      isMain: true,
      accessor: email => ({
        id: email.id
      }),
      Cell: ({ value: { id } }) => {
        return (
          <>
            <Link href="/emails/[emailId]" as={`/emails/${id}`}>
              <a className="actions small">{t('emails.detail')}&nbsp;&nbsp;›</a>
            </Link>
          </>
        );
      }
    }
  ];

  return (
    <EmailsWrapper>
      <EmailFilterWrapper>
        <div className="total_emails_wrapper">
          <p className="p-large">{t('emails.title')}</p>
          <p className="p-xsmall">{t('emails.total_email_count')}</p>
          <p className="p-xsmall total_count">{total}</p>
        </div>
      </EmailFilterWrapper>
      <div className="paper-body">
        <Table
          keyField="id"
          data={emails}
          columns={columns}
          style={{ minWidth: 660 }}
          noDataText={t('no_data.no_emails')}
          loading={loading}
          height={500}
        />
        <Pagination
          total={total}
          page={page}
          defaultPageSize={5}
          pageSize={parseInt(pageSize)}
          pageSizeOptions={pageSizeOptions}
          onChangePage={value => onQuery({ offset: (value - 1) * pageSize })}
          onShowSizeChange={value => onQuery({ limit: value, offset: 0 })}
        />
      </div>
    </EmailsWrapper>
  );
};

EmailsTable.propTypes = {
  data: PropTypes.object,
  total: PropTypes.number,
  loading: PropTypes.bool,
  onQuery: PropTypes.func.isRequired,
};

EmailsTable.defaultProps = {
  data: {},
  total: 0,
  loading: false,
};

export default memo(EmailsTable);
