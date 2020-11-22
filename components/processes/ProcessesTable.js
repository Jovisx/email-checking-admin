import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'i18n';

import Table from 'components/widgets/Table';
import Pagination from 'components/widgets/Pagination';

const ProcessesWrapper = styled.div`
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

const ProcessFilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 20px 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  border-bottom: var(--border-bottom-main);

  .total_processes_wrapper {
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


const ProcessesTable = ({ data, loading, onQuery }) => {
  const { emails = [], total = 0, offset = 0, limit: pageSize = 16 } = data;
  const page = Math.round(offset / pageSize) + 1;
  const { t } = useTranslation('language');

  const columns = [
    {
      id: 'emailId',
      Header: t('processes.emailId'),
      accessor: process => process.emailId,
      minWidth: 150
    },
    {
      id: 'userId',
      Header: t('processes.userId'),
      accessor: process => process.userId,
      minWidth: 150
    },
    {
      id: 'createdAt',
      Header: t('processes.createdAt'),
      accessor: process => process.createdAt,
      minWidth: 150
    },
    {
      id: 'startedAt',
      Header: t('processes.startedAt'),
      accessor: process => process.startedAt,
      minWidth: 150
    }
  ];

  return (
    <ProcessesWrapper>
      <ProcessFilterWrapper>
        <div className="total_processes_wrapper">
          <p className="p-large">{t('processes.title')}</p>
          <p className="p-xsmall">{t('processes.total_process_count')}</p>
          <p className="p-xsmall total_count">{total}</p>
        </div>
      </ProcessFilterWrapper>
      <div className="paper-body">
        <Table
          keyField="id"
          data={emails}
          columns={columns}
          style={{ minWidth: 660 }}
          noDataText={t('no_data.no_processes')}
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
    </ProcessesWrapper>
  );
};

ProcessesTable.propTypes = {
  data: PropTypes.object,
  total: PropTypes.number,
  loading: PropTypes.bool,
  onQuery: PropTypes.func.isRequired,
};

ProcessesTable.defaultProps = {
  data: {},
  total: 0,
  loading: false,
};

export default memo(ProcessesTable);
