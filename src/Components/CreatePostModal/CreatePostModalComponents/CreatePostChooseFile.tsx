import { useEffect, useContext } from 'react';
import { CreateModalContext } from '../../../Context/CreateModalContext';

const CreatePostChooseFile = ({
  setSelectedFile,
}: {
  setSelectedFile: (value: React.SetStateAction<File | null>) => void;
}) => {
  const { lastFocusableElementRef, handleFocusTrap } = useContext(CreateModalContext);
  const handleChooseFile = () => {
    const realBtn = document.querySelector('#file') as HTMLInputElement;
    realBtn.click();
  };

  useEffect(() => {
    const chooseFileBtn = document.querySelector(
      '.createModal__chooseFileBtn'
    ) as HTMLButtonElement;
    chooseFileBtn.focus();
  }, []);

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
      <br />
      <input
        type="file"
        id="file"
        accept=".png, .jpg, .jpeg, .gif"
        onChange={(event) => setSelectedFile(event.target.files![0])}
        hidden={true}
      />
      <button
        className="createModal__chooseFileBtn"
        onClick={handleChooseFile}
        ref={lastFocusableElementRef}
      >
        Select from computer
      </button>
      <div tabIndex={0} onFocus={() => handleFocusTrap('bottomTrap')}></div>
    </div>
  );
};

export default CreatePostChooseFile;
