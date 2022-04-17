import Picture from "../components/Picture";
import Form from "../components/Stories/Form";
import Select from "../components/Stories/Select";
import Tags from "../components/Stories/Tags";

const NewStory = () => {
  return (
    <>
      <Select from="story" />
      <Picture from="story" />
      <Form from="story" />
      <Tags from="story" />
    </>
  )
}

export default NewStory;