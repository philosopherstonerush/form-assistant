// Learn more about clients at https://docs.boundaryml.com/docs/snippets/clients/overview

client<llm> Gemini {
  provider "google-ai"
  options {
    model "gemini-1.5-pro"
    api_key env.GEMINI_KEY
  }
}
