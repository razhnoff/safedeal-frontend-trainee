import React, { useEffect, useState, useRef } from 'react';
import { Card, Button, Modal, Input } from './components';
import { MODE, TYPES_MSG } from './constants';
import './App.css';

const App = () => {
    const url = 'https://boiling-refuge-66454.herokuapp.com/images';
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [imageData, setImageData] = useState({});
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [comment, setComment] = useState('');
    const [userName, setUserName] = useState('');
    const modalRef = useRef(null);
    const [inputValues, setInputValues] = useState({
        [TYPES_MSG.COMMENT]: '',
        [TYPES_MSG.NAME]: '',
    });

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await fetch(url, { method: 'GET' });
            const data = await response.json();
            setData(data);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const getNowYear = () => {
        return new Date().getFullYear();
    };

    const clickImageHandler = async (ev) => {
        const id = parseInt(ev.target.dataset.id, 10);
        await fetchImageData(id);
    };

    const fetchImageData = async (id) => {
        try {
            const response = await fetch(`${url}/${id}`, { method: 'GET' });
            const data = await response.json();
            setImageData(data);
            setIsOpenModal(true);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const getImageCards = (items) => {
        return items.map(({ id, url }) => {
            return <Card key={id} mode={MODE.EDIT} id={id} url={url} onClick={clickImageHandler} />;
        });
    };

    const inputChangeHandler = (ev, type) => {
        console.log(ev.target.value, type);
        setInputValues({ ...inputValues, [type]: ev.target.value });
    };

    const getFormattedDate = (timestamp) => {
        const day =
            new Date(timestamp).getDate() < 10
                ? `0${new Date(timestamp).getDate()}`
                : new Date(timestamp).getDate();
        const initMonth = new Date(timestamp).getMonth() + 1;
        const month = initMonth < 10 ? `0${initMonth}` : initMonth;
        const year = new Date(timestamp).getFullYear();

        return `${day}.${month}.${year}`;
    };

    const getCommentTemplate = ({ key, date, comment }) => {
        return (
            <div key={key} className="comment-content">
                <span className="comment-date">{getFormattedDate(date)}</span>
                <span className="comment">{comment}</span>
            </div>
        );
    };

    const onModalClose = () => {
        setIsOpenModal(false);
        setUserName('');
        setComment('');
        setInputValues({ [TYPES_MSG.NAME]: '', [TYPES_MSG.COMMENT]: '' });
    };

    const setComments = async () => {
        const response = await fetch(`${url}/${imageData.id}/comments`, {
            method: 'POST',
            body: JSON.stringify({
                name: inputValues[TYPES_MSG.NAME],
                comment: inputValues[TYPES_MSG.COMMENT],
            }),
        });
        console.log(response);
    };

    if (isLoading) {
        return null;
    }

    return (
        <div className="App">
            <h1 className="App-title">TEST APP</h1>
            <main className="App-content">{getImageCards(data)}</main>
            {isOpenModal && (
                <Modal ref={modalRef} onClose={onModalClose}>
                    <div className="modal-form">
                        <div className="modal-inner">
                            <div className="left-side">
                                <Card
                                    mode={MODE.DISPLAY}
                                    id={imageData.id}
                                    url={imageData.url}
                                    className="modal-image"
                                />
                            </div>
                            <div className="right-side">
                                {imageData.comments.map(({ id: key, date, text: comment }) => {
                                    return getCommentTemplate({ key, date, comment });
                                })}
                            </div>
                        </div>
                        <div className="left-side">
                            <Input
                                type="text"
                                placeholder="Ваше имя"
                                onChange={(ev) => inputChangeHandler(ev, TYPES_MSG.NAME)}
                                style={{ marginTop: '30px' }}
                            />
                            <Input
                                type="text"
                                placeholder="Ваш комментарий"
                                onChange={(ev) => inputChangeHandler(ev, TYPES_MSG.COMMENT)}
                                style={{ marginTop: '20px' }}
                            />
                            <Button
                                value="Оставить комментарий"
                                onClick={setComments}
                                style={{ marginTop: '20px' }}
                                disabled={
                                    !inputValues[TYPES_MSG.NAME].length &&
                                    !inputValues[TYPES_MSG.COMMENT].length
                                }
                            />
                        </div>
                    </div>
                </Modal>
            )}
            <footer className="App-footer">
                <h5 className="App-footer-title">© 2018-{getNowYear()}</h5>
            </footer>
        </div>
    );
};

export default App;
