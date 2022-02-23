const CreatePostChooseFile = ({
  imageError,
  setSelectedFile,
}: {
  imageError: string;
  setSelectedFile: (value: React.SetStateAction<File | null>) => void;
}) => {
  return (
    <div className="createModal__chooseFile">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="120px"
        viewBox="0 0 24 24"
        width="120px"
        fill="silver"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
      </svg>
      {imageError && (
        <p>
          {imageError}. You can compress your image on{' '}
          <a href="https://squoosh.app/" target={'_blank'} rel="noreferrer noopener">
            squoosh.app
          </a>
          .
        </p>
      )}
      <br />
      <input
        type="file"
        id="file"
        accept=".png, .jpg, .jpeg, .gif"
        onChange={(event) => setSelectedFile(event.target.files![0])}
      />
      <label htmlFor="file">Select from computer</label>
    </div>
  );
};

export default CreatePostChooseFile;
