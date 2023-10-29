import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import "./App.css";
function Login() {
    const [formData, setFormData] = useState({
        name: '',
        password: ''

    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await Axios.post('http://localhost:3000/api/auth/signin', formData);
            console.log('Ответ от сервера:', response.data);

            const token = response.data.accessToken; // Получаем токен из ответа

            // Сохр.токен в хранилище на стороне клиента
            localStorage.setItem("token", token);
            Axios.defaults.headers.common['Authorization'] = 'Bearer ${token}';
            // После успешного входа, перенаправить
            navigate('/user', { state: { token }, replace: true });
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    };

    return (
        <div>
            <h2>Вход</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Имя пользователя:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Пароль:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Войти</button>
                <div></div>
                <Link to="/signup" className="button-reg">Зарегистрироваться</Link>
            </form>
        </div>
    );
}

export default Login;

