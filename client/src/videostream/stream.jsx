import './stream.css';

function Stream(props) {
    return (
        <div >
            <header>STREAM</header>
            <div>
            <video src="http://localhost:5000/live" width='540' controls></video>
            </div>
        </div>
    );
}

export default Stream;