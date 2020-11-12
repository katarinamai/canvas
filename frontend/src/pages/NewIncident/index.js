import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const selectedCanvas = localStorage.getItem('selectedCanvas');

    useEffect(() => {
        api.get('profile',
            {
                headers: {
                    Authorization: ongId,
                },
            }
        ).then(response => {
            const canvas = response.data.filter(canva => canva.id == selectedCanvas);
            if (canvas[0] !== undefined) {
                setTitle(canvas[0].title);
                setDescription(canvas[0].description);
                setValue(canvas[0].value);
            }
        });
    }, [ongId]);

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            if (selectedCanvas) {
                await api.delete(`incidents/${selectedCanvas}`,
                    {
                        headers: {
                            Authorization: ongId,
                        },
                    }
                );
            }
            await api.post('incidents', data,
                {
                    headers: {
                        Authorization: ongId,
                    },
                });

            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadastrar caso, tente novamente.')
        }

    }

    return (
        <div className="new-incident-container">
            <section>
                <img className="logo" src={logoImg} alt="Be The Hero" />
                <input
                    placeholder="Título do Canvas"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </section>
            <div className="content">
                <form onSubmit={handleNewIncident}>
                    <div>
                        <p>O que eu sei fazer?
                        (Formação, habilidades,
                        experiências, projetos)
                        </p>
                        <textarea
                            placeholder="Descrição"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <textarea
                            placeholder="Descrição"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <textarea
                            placeholder="Descrição"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <textarea
                            placeholder="Descrição"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <textarea
                            placeholder="Descrição"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <textarea
                            placeholder="Descrição"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <textarea
                            placeholder="Descrição"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="canva-footer">
                        <Link className="back-link link" to="/profile">
                            <FiArrowLeft size={16} color="#E02041" />
                             Voltar para Home
                        </Link>
                        <button className="button salvar" type="submit">Salvar Canvas</button>
                    </div>
                </form>
            </div>
        </div>
    );
}