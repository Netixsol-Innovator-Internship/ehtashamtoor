
import Feed from "@components/Feed";

const Home = () => {

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Discover and Share</h1>
      <br className="max-md:hidden" />
      <span className="head_text orange_gradient text-center">
        AI-powered Prompts
      </span>
      <p className="desc text-center">
        AiPrompt is an open source AI powered prompting tool for modern world to
        discover, create and share creative and innovative ideas and prompts
      </p>

      {/* Feed */}
      <Feed />
    </section>
  );
};

export default Home;
