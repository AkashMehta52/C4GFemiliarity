import UserData from '../models/user.js';


//register a user
export const createUser = async (req, res) => {
    const { email, firstName, lastName, password, mentor, mentee } = req.body;
    const userExists = await UserData.findOne({ email });

    if(userExists) {
        res.status(400)
        throw new Error('That email is already associated with an account!');
    }

    const user = await UserData.create({
        email,
        firstName,
        lastName,
        password,
        mentor,
        mentee,
    });

    if(user) {
        res.status(201).json({
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            mentor: user.mentor,
        });
    } else {
        res.status(400)
        throw new Error('Creation Error Occured!');
    }
}

export const authenticateUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserData.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            email: user.email,
        });
    } else {
        res.status(400)
        throw new Error('Invalid Email Address or Password!');
    }
}

export const getUser = async (req, res) => {
    const email = req.body.email;
    try {
        const currentUser = await UserData.findOne({email: email}).exec();
        res.status(200).json(currentUser);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getMentee = async (req, res) => {
    const mentee = req.body.mentee;
    try {
        const currentUser = await UserData.findOne({email: mentee}).exec();
        res.status(200).json(currentUser);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await userData.findByIdAndRemove(id).exec();
        res.send('Successfully Deleted!');
    } catch (error) {
        console.log(error);
    }
}

export const updateMentor = async (req, res) => {
    console.log(req.body);
    const filter = { email: req.body.email };
    const update = { mentor: req.body.mentor };

    try {
        let updatedUser = await UserData.findOneAndUpdate(filter, update, {
            new: true,
        });
        console.log(updatedUser.email);
        console.log(updatedUser.mentor);
        
    } catch (error) {
        console.log(error);
    }
}

export const updateMentee = async (req, res) => {
    console.log(req.body);
    const filter = { email: req.body.email };
    const update = { mentee: req.body.mentee };

    try {
        let updatedUser = await UserData.findOneAndUpdate(filter, update, {
            new: true,
        });
        console.log(updatedUser.email);
        console.log(updatedUser.mentee);
        
    } catch (error) {
        console.log(error);
    }
}

export const updateMoodBoard = async (req, res) => {
    console.log(req.body);
    const filter = { email: req.body.email };
    const currentMood = { day: Date.now(), moodValue: req.body.moodValue, journalEntry: req.body.journalEntry, privateEntry: req.body.privateEntry };
    const update = { $push: { moodBoard: currentMood }};

    try {
        let updatedUser = await UserData.findOneAndUpdate(filter, update, {
            new: true,
        });
        console.log(updatedUser.email);
        console.log(updatedUser.moodBoard);
        
    } catch (error) {
        console.log(error);
    }
}
