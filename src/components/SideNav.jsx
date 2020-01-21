/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Typography, Spin, Button, Icon, Tooltip } from 'antd';
import styled from 'styled-components';

import { mobilePortrait, primaryGrey } from '../styles/theme.styles';

import { editProfile } from '../state/actions/user';
import Logo from './Logo';
import Avatar from './Avatar';
import openNotification from '../utils/openNotification';
import { getLocation } from '../utils/getLocation';
import Interests from './Interests';
import { LogoutUser } from '../state/actions/auth';

const { Paragraph } = Typography;

const StyledSpin = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const SideNav = ({ visible, user, editProfile, isLoading, LogoutUser }) => {
  const handleChange = async fullname => {
    await editProfile({ full_name: fullname }, user.id);
    openNotification('Full name updated');
  };

  const updateLocation = async () => {
    await getLocation(user.id);
  };

  return (
    <StyledContainer className={visible ? 'show-drawer' : null}>
      {isLoading ? (
        <StyledSpin>
          <Spin />
        </StyledSpin>
      ) : (
        <>
          <Logo smaller />
          <div className="user-profile-wrap">
            <Avatar userImage={user.profile_picture} />
            <Paragraph
              className="heading"
              editable={{ onChange: handleChange }}
            >
              {user.full_name}
            </Paragraph>
            <Paragraph>@{user.username}</Paragraph>
            {user.location && (
              <div className="location">
                <i aria-label="location" className="fas fa-map-marker-alt" />
                <Paragraph>{user.location}</Paragraph>
                <Tooltip title="Edit">
                  <Button
                    icon="edit"
                    size="small"
                    ghost
                    className="edit"
                    type="primary"
                    onClick={updateLocation}
                  />
                </Tooltip>
              </div>
            )}
            <div className="interests">
              <Interests />
            </div>
          </div>
          <nav className="navlinks">
            <NavLink
              exact
              to="/dashboard"
              className="link"
              activeClassName="active"
            >
              Home
            </NavLink>
            <NavLink to="/reviews" className="link">
              Manage Reviews
            </NavLink>
            <NavLink to="/add-review" className="link">
              Leave a Review
            </NavLink>
            <Button type="link" onClick={LogoutUser}>
              Sign Out
              <Icon type="right" />
            </Button>
          </nav>
        </>
      )}
    </StyledContainer>
  );
};

const mapStateToProps = state => ({
  user: state.authState.credentials,
  isLoading: state.authState.isLoading,
});

export default connect(mapStateToProps, { editProfile, LogoutUser })(SideNav);

const StyledContainer = styled.div`
  max-width: 250px;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  height: 100vh;
  overflow-y: auto;
  background: ${primaryGrey};

  @media ${mobilePortrait} {
    width: 60%;
  }

  .location {
    display: flex;
    align-items: center;
    margin-top: 10px;

    .fas {
      margin-right: 10px;
    }
    .edit {
      margin-left: 20px;
    }

    div {
      margin-bottom: 0;
    }
  }

  .navlinks {
    display: flex;
    flex-direction: column;
  }
  @media ${mobilePortrait} {
    position: fixed;
    top: 0;
    left: -300px;
    width: 70%;
    z-index: 3;
    max-width: 300px;
    transition: all 0.25s linear;
    &.show-drawer {
      left: 0;
    }
  }

  .navlinks {
    display: flex;
    flex-direction: column;
    a.link {
      color: #262626;
      display: block;
      font-weight: 500;
      font-size: 1rem;
      padding: 0.25rem 0;

      &.active {
        color: #bb1333;
      }
    }
    .ant-btn-link {
      color: #262626;
      padding: 0.25rem 0;
      display: block;
      text-align: left;
      visibility: hidden;
      font-weight: 500;
      font-size: 1rem;
      @media ${mobilePortrait} {
        visibility: visible;
      }
    }
  }

  .user-avatar {
    width: 70px;
    height: 70px;
    border-radius: 50%;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .user-profile-wrap {
    padding: 5rem 0 2rem;
    @media ${mobilePortrait} {
      padding-top: 0;
    }

    div.ant-typography,
    div.ant-typography p {
      margin-bottom: 0;

      &.heading {
        font-size: 1.1rem;
        font-weight: 600;
        color: #000;
      }
    }
  }

  .interests {
    margin-top: 20px;
    width: 80%;
  }
`;
