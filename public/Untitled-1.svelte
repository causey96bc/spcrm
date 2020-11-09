$: {
    console.log("files", files);
    const [file] = files;
    if (file) {
      file.arrayBuffer().then((ab) => {
        const b64 = btoa(new Uint8Array(ab));
        console.log("b64", b64);
      });
      //   const ref = firebase.storage().ref(`test/${file.name}`);
      //   ref.put(file);
    }
  }
