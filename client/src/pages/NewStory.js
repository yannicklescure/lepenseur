import Picture from "../components/Picture";
import Form from "../components/Stories/Form";

const NewStory = () => {
  return (
    <>
      <Form from="story" />
      <Picture from="story" />
    </>
  )
}

export default NewStory;