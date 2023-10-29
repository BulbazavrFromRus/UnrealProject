import React, { useState } from 'react';
import Axios from 'axios';
import {Link,useNavigate} from "react-router-dom";



function RegistrationForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!formData.email.includes('@')){
            alert("Введите корректный адрес почты");
            return;
        }

        try {
            // Выполнить POST-запрос на сервер, передав данные formData
            const response = await Axios.post('http://localhost:3000/api/auth/signup', formData);
            console.log('Ответ от сервера:', response.data);

            localStorage.setItem('token',response .data.token);

            Axios.defaults.headers.common['Authorization'] = 'Bearer ${token}';

            navigate('/user', {replace: true});

        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    };

    return (
        <div>
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Имя пользователя:</label>
                    <input
                        type="text"
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Электронная почта:</label>
                    <input
                        type="text"
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input
                        type="password"
                        name="password"
                        minLength="3"
                        maxLength="8"
                        value={formData.password}
                        required

                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    );
}

export default RegistrationForm;