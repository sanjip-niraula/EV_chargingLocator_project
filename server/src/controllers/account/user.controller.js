import ApiResponse from "#utils/ApiResponse";
import asyncHandler from "#utils/asyncHandler";

export const getUsers = asyncHandler(async (req, res) => {
    // Simulate fetching users from a database add the mongo db connection and model later
    const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
    ];

    res.status(200).json(
        new ApiResponse(200, 'Users fetched successfully', users)
    );
});

