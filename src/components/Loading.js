import ReactLoading from 'react-loading';
export default function Loading() {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, height: '100%', width: '100%', background: 'rgba(0,0,0,0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <h1 style={{ color: 'white'}}>Carregando...</h1>
            <ReactLoading type="spinningBubbles" height={'10%'} width={'10%'} />
        </div>
    )
}