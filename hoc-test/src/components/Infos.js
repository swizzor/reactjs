import React from 'react';
import { withLoading } from '../hocs/withLoading';

const Infos = () => (
    <ul style={{clear:'both', displa:'block', listStyle:'none'}}>
        <li>
            <img
                alt="me"
                src='https://cdn.dicionariopopular.com/imagens/xablau-og.jpg'
                style={{ margin: '0 auto' }}
            />
        </li>
        <li>Xablau 1</li>
        <li>Xablau 2</li>
        <li>Xablau 3</li>
    </ul>
);

export default withLoading(Infos);