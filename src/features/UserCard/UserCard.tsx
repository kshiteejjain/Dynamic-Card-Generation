import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";

import './UserCard.scss';

const UserCard = () => {
    const [currentImage, setCurrentImage] = useState<any | object>([]);
    const users = useSelector((store : RootState) => store.users);
    const navigate = useNavigate();
    const { selectedImage } = useSelector((state: RootState) => ({ selectedImage: state.imageList?.selectedImage}));

    useEffect(() => {
        setCurrentImage(selectedImage)
    }, [selectedImage]);

    const newCard = () => {
        navigate("/");
        window.location.reload();
    };

    return (
        <div className='cardWrapper' data-testid="cardWrapper">
            <h1>User Card</h1>
            <div className='cardParent'>
                {currentImage?.map((e: string, i: number) => {
                    return (
                        <div className='card' key={i}>
                            <div className='cardImage'>
                                <img alt='Profile' src={e} className='profilePic' />
                            </div>
                            <label>Name: <span>{users[0].userName}</span></label>
                            <label>Surname: <span> {users[0].surname}</span></label>
                            {users[0].topic !== 'Other' ? <label>Topic: <span>{users[0].topic}</span></label> : null}
                            {users[0].otherTopic !== '' ? <label>Topic: <span>{users[0].otherTopic}</span></label> : null}
                        </div>
                    )
                })}
            </div>
            <p onClick={newCard} className='buttonPrimary'>Make New Card</p>
        </div>
    )
}

export default UserCard;