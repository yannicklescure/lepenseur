import Picture from "../components/Picture";
import Form from "../components/Stories/Form";
import Select from "../components/Stories/Select";

const NewStory = () => {
  return (
    <>
      <Select from="story" />
      <Picture from="story" />
      <Form from="story" />
    </>
  )
}

export default NewStory;