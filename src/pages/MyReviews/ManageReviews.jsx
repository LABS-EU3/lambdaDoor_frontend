/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import {
  getCompanyReviews,
  getSalaryReviews,
} from '../../state/actions/reviews';
import MySalaryReviewList from '../../components/MyReviews/Salary/MySalaryReviewList';
import CompanyReviewList from '../../components/MyReviews/Company/CompanyReviewList';
import InterviewReviewList from '../../components/MyReviews/Interview/InterviewReviewList';

const { TabPane } = Tabs;

const ManageReviews = ({ history }) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/');
    }
  }, []);

  return (
    <div>
      <h1>My Reviews</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Company Reviews" key="1">
          <CompanyReviewList />
        </TabPane>
        <TabPane tab="Salary Reviews" key="2">
          <MySalaryReviewList />
        </TabPane>
        <TabPane tab="Interview Reviews" key="3">
          <InterviewReviewList />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default connect(state => state, {
  getCompanyReviews,
  getSalaryReviews,
})(ManageReviews);
