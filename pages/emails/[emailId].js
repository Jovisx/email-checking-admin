import React,  { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { i18n, Router } from 'i18n';

import { GridContainer, Row, Col } from 'components/grids';
import Button from 'components/widgets/Button';
import { emailsActions } from 'store/actions';
import { fromEmails } from 'store/selectors';
import toast from 'components/toastify/toast';

import MainLayout from 'layouts/MainLayout';

const Gap = styled.div`
  width: 100%;
  height: 0;
  @media (max-width: 767px) {
    height: 56px;
    user-select: none;
  }
`;

const EmailDetailPage = () => {
  const [emailInfo, setEmailInfo] = useState({});
  const [isPending, setIsPending] = useState({});
  const router = useRouter();
  const { emailId } = router.query;
  const emailObj = useSelector(fromEmails.emails);
  const emails = emailObj.emails;

  const dispatch = useDispatch();
  const moveStatus = useSelector(fromEmails.moveStatus);

  useEffect(() => {
    if (!emails || emails.length === 0) {
      return;
    }
    const email = emails.find(item => item.id === emailId);
    if (email.status === 'Pending') {
      setIsPending(true);
    } else {
      setIsPending(false);
    }
    setEmailInfo(email);
  }, [emails]);

  useEffect(() => {
    if (moveStatus === 'success') {
      toast({
        title: i18n.getResource(i18n.language, 'language', 'success.MOVE_EMAIL_SUCCESS'),
      });
    }
    if (moveStatus === 'failure') {
      toast({
        title: i18n.getResource(i18n.language, 'language', 'errors.MOVE_EMAIL_FAILED'),
      });
    }
  }, [moveStatus]);

  const onBack = () => {
    Router.push(`/emails`);
  };

  const onMove = () => {
    dispatch(emailsActions.moveEmailRequest({emailId}));
  };
  
  return (
    <MainLayout title="Email Detail">
      <Gap />
      <GridContainer gutter={20}>
        <Row>
          <Col xl={12}>
            Email ID: {emailInfo.id}
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col xl={12}>
            Subject: {emailInfo.subject}
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col xl={12}>
            Status: {emailInfo.status}
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col xl={12}>
            Date: {emailInfo.createdAt}
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col xl={12}>
            Email Lead: {emailInfo.emailLead}
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col xl={12}>
            Resolved by: {emailInfo.resolvedBy}
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col xl={12}>
            Email Body: {emailInfo.emailBody}
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col sm={4}>
              <Button type="primary" onClick={onBack}>BACK</Button>
          </Col>
          <Col sm={4}>
            {
              !isPending && (
              <Button type="primary" onClick={onMove}>Move to Process Pool</Button>
            )}
          </Col>
        </Row>
      </GridContainer>
    </MainLayout>
  );
};

EmailDetailPage.propTypes = {
};

EmailDetailPage.defaultProps = {
};

export default EmailDetailPage;
