import React, { Fragment, useEffect, useState } from 'react';
import './profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { BASE_URL, IMG_CDN } from '../../../config/URLS';
import jwt from 'jsonwebtoken';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Header from '../header/header';
import MyAxiosInstance  from '../../../utils/axiosAdmin';
import { updateUserList } from '../../../utils/adminSlice';


const UserInfo = () => {
  const goto = useNavigate();
  const login = useSelector((store) => store.adminInfo.login);
  const axiosInstance = MyAxiosInstance();
  const [user, setUser] = useState([]);
  const [picture, setPicture] = useState();
  const [name, setName] = useState();
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [block, setBlock] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();

  const userlist = useSelector((store) => store.adminInfo.userlist);

  useEffect(() => {
    if (!login) {
      goto('/admin/login');
    } else {
      filterUser();
    }

    async function filterUser() {
      const response = await axiosInstance.get( 'admin/allusers');

      const allUsers = jwt.decode(response.data);
      const final = allUsers.response
      dispatch(updateUserList(final));

      const filteredUser = Array.from(userlist).find((obj) => obj._id === id);
      setUser(filteredUser);

      const productResponse = await axiosInstance.get( `admin/products/${id}`);
      setProducts(productResponse.data);
    }
  }, []);

  useEffect(() => {
    const filteredUser = Array.from(userlist).find((obj) => obj._id === id);
    setUser(filteredUser);
    if (user && user.uname) {
      setName(user.uname);
      setPicture(user.picture);
      setEmail(user.email);
      setPhone(user.phone);
      setBlock(user.block);
    }
console.log("from efeeect");
    console.log(userlist)
    console.log(user)
  }, [user,userlist]);

  const blockUser = (id) => {
    axiosInstance.get(`admin/blockuser/${id}`).then((response1) => {
      axiosInstance.get('admin/allusers').then((response) => {

        const allUsers = jwt.decode(response.data);
      dispatch(updateUserList(allUsers));

       

        const filteredUser = Array.from(response.data).find((obj) => obj._id === id);
        setUser(filteredUser);

        setBlock(true);
      });
    });
  };

  const unblockUser = (id) => {
    axiosInstance.get( `admin/unblockuser/${id}`).then((response1) => {
      axiosInstance.get( 'admin/allusers').then((response) => {
        const allUsers = jwt.decode(response.data);
      dispatch(updateUserList(allUsers));
       

        const filteredUser = Array.from(response.data).find((obj) => obj._id === id);
        setUser(filteredUser);

        setBlock(false);
      });
    });
  };

  return (
    <Fragment>
      <Header />
      <Toaster />
      {login ? (
        <div>
          <card>
            <div className="centerDiv">
              <img
                alt="Posts"
                width="170px"
                height="150px"
                src={
                  picture
                    ? `https://res.cloudinary.com/dfhcxw70v/image/upload/v1686835716/${picture}`
                    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                }
                id="profilePicture"
              />

              <br />
              <form>
                <label htmlFor="fname">Name: {name ? name : null}</label>
                <br />
                <label htmlFor="fname">Email: {email ? email : null}</label>
                <br />
                <label htmlFor="fname">Phone: {phone ? phone : null}</label>
                <br />
                <label htmlFor="fname">
                  Products Added: {products ? products?.length : null}
                </label>
                <br />
                <label htmlFor="fname">
                  Account Status:{' '}
                  {block ? (
                    <span style={{ color: 'red' }}>Blocked</span>
                  ) : (
                    <span style={{ color: 'green' }}>Active</span>
                  )}
                </label>
                <br />
                <br />
              </form>
              {block ? (
                <Link id="unblock" onClick={() => unblockUser(id)}>
                  <button>Unblock User</button>
                </Link>
              ) : (
                <Link id="block" onClick={() => blockUser(id)}>
                  <button>Block User</button>
                </Link>
              )}
              <br />
            </div>
          </card>
          <div
            className="card-container"
            style={{ display: 'flex', flexFlow: 'row', flexWrap: 'wrap' }}
          >
            {products.map((items) => {
              return (
                <Link
                  to=""
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <div
                    class="card"
                    style={{ overflowY: 'hidden', height: '350px' }}
                  >
                    <div class="card-img">
                      <img
                        src={`${IMG_CDN}${items.image}`}
                        alt=""
                      />
                    </div>
                    <div
                      class="card-title"
                      style={{ overflow: 'hidden', height: '2rem' }}
                    >
                      {items.name}
                    </div>
                    <div
                      class="card-subtitle"
                      style={{ overflow: 'hidden', height: '2rem' }}
                    >
                      Category: {items.category}.
                    </div>
                    <hr class="card-divider" />
                    <div
                      class="card-footer"
                      style={{ overflow: 'hidden', height: '2rem' }}
                    >
                      <div
                        class="card-price"
                        style={{ overflow: 'hidden', height: '2rem' }}
                      >
                        <span>₹</span> {items.price.substring(0, 13)}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default UserInfo;
