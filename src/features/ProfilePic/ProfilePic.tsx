import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { getImages, selectedImage, removeImage } from './ProfilePicSlice';
import { useNavigate } from "react-router-dom";
import Checkmark from '../../assets/checkmark.svg';

import './ProfilePic.scss';

export let pageId = 0;

const ProfilePic = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { images, loading } = useSelector((state: RootState) => state.imageList);
    const activeImage = useSelector((state: RootState) => state.imageList.selectedImage || '');
    const users = useSelector((store: RootState) => store.users);
    const navigate = useNavigate();

    useEffect(() => {
        if ((localStorage.getItem('topic') !== users.slice(-1)[0]?.topic && localStorage.getItem('topic') !== users.slice(-1)[0]?.otherTopic) || images?.length < 1) {
            dispatch(getImages(pageId));
            pageNum = ++pageId;
        }
    }, [dispatch, images, users])

    const getCurrentImage = (e: string) => {
        dispatch(selectedImage(e))
    }

    const handleNext = () => {
        navigate("/UserCard");
    }

    const handleRemove = (id: string) => {
        dispatch(removeImage(id))
    };

    const newCard = () => {
        navigate("/");
        window.location.reload();
    };


    return (
        <div data-testid="profilePic">
            {images?.length < 1 && users.length < 1 ?
                <div className='emptyStateProfile'>
                    <h2>Whoops..! </h2>
                    <p>Some error might Occurred, please click below to create new user card.</p>
                    <span onClick={newCard} className='buttonPrimary'>Make New Card</span>
                </div>
                :
                null}
            {loading ? null :
                <div>
                    <h2 data-testid="profileTitle" className='flexHeading'>Please Select one image for your profile
                        <span className='imageCount'>Visible Images: {images?.length} </span>
                    </h2>
                    <div className='imageWrapper'>
                        {images?.map((img: string, i: number) => {
                            return (
                                <div className={activeImage?.includes(img) ? 'active imageContainer' : 'imageContainer'} key={i}>
                                    <img src={Checkmark} className='checkmark' alt='profile' />
                                    <img src={img} className='profilePic' alt='profile' />
                                    <div className='buttonContainer'>
                                        <button className='acceptButton' onClick={() => getCurrentImage(img)}>Accept</button>
                                        <button className='rejectButton' onClick={() => handleRemove(img)}>Reject</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className='align-center'>
                        {activeImage && activeImage?.length > 0 ? <p className='buttonPrimary' onClick={handleNext}> Next </p> : null}
                    </div>
                </div>}
        </div>
    )
};

export let pageNum: number;
export default ProfilePic;