import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//import { auth } from './configs/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth'
//------------------------------------------
import { Auth } from "./components/auth";
import { db, auth, storage } from './configs/firebase';
// One doc movie only
import { getDoc } from 'firebase/firestore'

//docs bunch of movie
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage';

// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
// import ChatRoomList from './components/ChatRoomList';
// import ChatRoom from './components/ChatRoom';
// import Error404 from './components/Error404';

function App() {
  // // State variables to store user information and loading status
  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // useEffect hook to listen for authentication state changes
  //   const unsubscribe = onAuthStateChanged(auth, user => {
  //     console.log('onAuthStateChanged', user);
  //     setUser(user);
  //     setLoading(false);
  //   });
  //   // Clean up the subscription when the component unmounts
  //   return () => unsubscribe();
  // }, []);

  // const onSignOut = async () => {
  //   // Function to handle user sign out
  //   await signOut(auth);
  // }

  const [movieList, setMovieList] = useState([])

  //New Movies States
  const [newMovieTitle, setNewMovieTitle] = useState("")
  const [newReleaseDate, setNewReleaseDate] = useState(0)
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false)

  //Update Title State
  const [updatedTitle, setUpdatedTitle] = useState("")

  //File Upload State
  const [fileUpload, setFileUpload] = useState(null)

  //Name of your collection like for example "movies" pangalan sa akong collection
  const moviesCollectionRef = collection(db, "movies")

  //This is the function that we're going to be using to query or receive or read our database
  const getMovieList = async () => {
    // READ THE DATA FROM THE DATABASE
    // SET THE MOVIE LIST
    try {
      const data = await getDocs(moviesCollectionRef)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      // console.log(filteredData);
      //If we want to display in our scree:
      setMovieList(filteredData)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, [])


  //Using add doc short for add document
  const onSubmitMovie = async () => {
    try {
      //Inig ka submit sa movie
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid
      });

      //Mo display sa movie every time nga musabmit
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  //Delete movie using deleteDoc short for delete Documentation
  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await deleteDoc(movieDoc);
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await updateDoc(movieDoc, { title: updatedTitle });
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload)
    } catch (err) {
      console.error(err)
    }
  };


  return (
    <div>
      {
        <div className='App'>
          <Auth />

          <div>
            <input
              placeholder='Movie title...'
              onChange={(e) => setNewMovieTitle(e.target.value)}
            />
            <input
              placeholder='Release Date...'
              type='number'
              onChange={(e) => setNewReleaseDate(Number(e.target.value))}
            />
            <input
              type='checkbox'
              checked={isNewMovieOscar}
              onChange={(e) => setIsNewMovieOscar(e.target.checked)} />
            <label>Received an Oscar</label>
            <button onClick={onSubmitMovie}> Submit Movie</button>
          </div>

          <div>
            {movieList.map((movie) => (
              <div>
                <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
                  {movie.title}
                </h1>
                <p>Date: {movie.releaseDate}</p>

                {/* So if you want to delete a movie, make sure to use this syntax: {() => deleteMovie(movie.id)} 
                     not this syntax {() => deleteMovie(movie.id)} only for delete*/}
                <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

                <input
                  placeholder='new title...'
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <button onClick={() => updateMovieTitle(movie.id)}>Update Title</button>
              </div>
            ))}
          </div>

          <div>
            <input
              type='file'
              onChange={(e) => setFileUpload(e.target.files[0])} />
            <button onClick={uploadFile}>Upload File</button>
          </div>
        </div>
      }
    </div>
  )
}

export default App;
