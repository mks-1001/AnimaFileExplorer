# AnimaFileExplorer

AnimaFileExplorer is a web application that combines file analysis with playful animal GIF exploration. It allows users to upload and analyze files while also providing an entertaining interface to view randomly selected animal GIFs, showcasing the integration of practical file handling with engaging content retrieval from external APIs.

## Setup Instructions

Follow these steps to set up and run the AnimaFileExplorer project:

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/AnimaFileExplorer.git
   cd AnimaFileExplorer
   ```

2. **Create a virtual environment**
   ```
   python -m venv venv
   ```

3. **Activate the virtual environment**
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS and Linux:
     ```
     source venv/bin/activate
     ```

4. **Install the required packages**
   ```
   pip install -r requirements.txt
   ```

5. **Set up the GIPHY API key**
   - Go to [GIPHY Developers](https://developers.giphy.com/) and create an account if you don't have one.
   - Create a new app to get an API key.
   - Go to `.env` file in the project root directory and add your GIPHY API key:
     ```
     GIPHY_API_KEY=<YOUR_GIPHY_API_KEY>
     ```

6. **Run the Flask application**
   ```
   flask run
   ```

7. **Access the application**
   Open a web browser and go to `http://127.0.0.1:5000/`

## Requirements

- Python 3.7+
- Flask
- python-dotenv
- Requests (for API calls)

For a complete list of dependencies, see `requirements.txt`.

## Contributing

Contributions to AnimaFileExplorer are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
