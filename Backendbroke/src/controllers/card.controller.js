import Listing from '../model/card.model.js';

// Create a new listing
export const createListing = async (req, res) => {
  try {
    const { title, description, price, country, location } = req.body;
    const image = req.file ? req.file.path : null; // Handle image file

    const newListing = new Listing({
      title,
      description,
      image,
      price,
      country,
      location,
    });

    await newListing.save();
    res.status(201).json({ message: 'Listing created successfully', listing: newListing });
  } catch (error) {
    res.status(500).json({ message: 'Error creating listing', error });
  }
};

// Read all listings
export const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving listings', error });
  }
};

// Read a single listing by ID
export const getListingById = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving listing', error });
  }
};

// Update a listing by ID
export const updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, country, location } = req.body;
    const image = req.file ? req.file.path : null;

    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      { title, description, image, price, country, location },
      { new: true, runValidators: true }
    );

    if (!updatedListing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.status(200).json({ message: 'Listing updated successfully', listing: updatedListing });
  } catch (error) {
    res.status(500).json({ message: 'Error updating listing', error });
  }
};

// Delete a listing by ID
export const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedListing = await Listing.findByIdAndDelete(id);

    if (!deletedListing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.status(200).json({ message: 'Listing deleted successfully', listing: deletedListing });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting listing', error });
  }
};
