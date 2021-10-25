import './stream.css';

function Stream(props) {
    return (
        <div >
            <header>STREAM</header>
            <br />
            <div> 
            <video src="http://localhost:5000/live" width='1080' height='500' controls></video>
            </div>
        </div>
    );
}

export default Stream;