# 🎬 YouTube Content Creator

An AI-powered tool for creating YouTube content - generate scripts, thumbnails, and visual workflows using OpenRouter.

## ✨ Features

- **Visual Workflow Builder**: Drag-and-drop interface for creating content generation workflows
- **AI Script Generation**: Generate engaging YouTube video scripts using OpenRouter
- **AI Thumbnail Design**: Create thumbnail concepts and descriptions
- **Execution Tracking**: See your workflow execute in real-time with detailed logs
- **Dark Mode**: Beautiful dark mode support for comfortable working
- **No Database Required**: Everything runs client-side with local state management

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- OpenRouter API key ([Get one here](https://openrouter.ai/))

### Installation

```bash
# Clone the repository
git clone https://github.com/filiksyos/youtube-content-creator.git
cd youtube-content-creator

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Add your OpenRouter API key to .env.local
# NEXT_PUBLIC_OPENROUTER_API_KEY=your_key_here

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start creating!

## 🎯 How It Works

1. **Build Your Workflow**: Use the visual canvas to drag and drop nodes
2. **Configure Nodes**: Set up each node with your content requirements
3. **Execute**: Run the workflow to generate scripts and thumbnails
4. **Track Progress**: Watch execution logs in real-time
5. **Export**: Copy generated content for your YouTube videos

## 🛠️ Technology Stack

- **Framework**: Next.js 16 with React 19
- **AI Provider**: OpenRouter (supports multiple models)
- **Workflow Builder**: React Flow (@xyflow/react)
- **State Management**: Jotai
- **Styling**: Tailwind CSS v4
- **Theme**: next-themes for dark mode
- **UI Components**: Custom components with Radix UI primitives

## 🤖 Supported AI Models

The app uses OpenRouter with these models:

### Text Generation (Scripts)
- `google/gemini-2.0-flash-exp:free` - Fast, free script generation
- `anthropic/claude-3.5-sonnet` - High-quality creative writing
- `openai/gpt-4-turbo` - Premium script generation

### Image Generation (Thumbnails)
- `google/gemini-2.5-flash-image` - Thumbnail concept visualization
- Other image models available via OpenRouter

## 📝 Usage Example

### Creating a Script Generation Workflow

1. Add a **Manual Trigger** node
2. Add an **AI Script Generator** action node
3. Configure with your video topic and style
4. Connect the nodes
5. Click Execute
6. View generated script in the execution panel

### Creating a Thumbnail Workflow

1. Add a **Manual Trigger** node
2. Add an **AI Thumbnail Designer** action node
3. Specify your video topic and thumbnail style
4. Execute and get thumbnail concepts

## 🔧 Configuration

All configuration is done through environment variables:

```env
NEXT_PUBLIC_OPENROUTER_API_KEY=sk-or-v1-...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=YouTube Content Creator
```

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Built with inspiration from [vercel-labs/workflow-builder-template](https://github.com/vercel-labs/workflow-builder-template)
- OpenRouter integration inspired by [filiksyos/affirmation-screensaver](https://github.com/filiksyos/affirmation-screensaver)
- Powered by OpenRouter for AI model access
