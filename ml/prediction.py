import pickle

# Load the trained model from the file
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

# Define a function that takes input data and returns the model's prediction
def predict(input_data):
    # Process the input data as necessary (e.g. convert to a numpy array)
    input_array = [[input_data]]

    # Get the model's prediction for the input data
    prediction = model.predict(input_array)

    # Return the prediction as a string or JSON object
    return prediction[0]
