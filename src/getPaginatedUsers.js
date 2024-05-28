const mongoose = require('mongoose');
const User = require('./models/user');
const Interaction = require('./models/interaction');
const Block = require('./models/block');

async function getPaginatedUsers(db, currentUser, page, pageSize = 20) {
  const { _id, agePreference, genderPreference, location } = currentUser;

  const maxDistance = 100; // Example max distance in kilometers

  const superlikedUsers = await Interaction.find({ toUserId: _id, type: 'superlike' }).select(
    'fromUserId'
  );

  const blockedUsers = await Block.find({
    $or: [{ blockerId: _id }, { blockedId: _id }],
  }).select('blockerId blockedId');

  const blockedUserIds = blockedUsers.map((b) =>
    b.blockerId.equals(_id) ? b.blockedId : b.blockerId
  );

  const interactedUsers = await Interaction.find({ fromUserId: _id }).select('toUserId');
  const interactedUserIds = interactedUsers.map((i) => i.toUserId);

  const excludedUserIds = [...new Set([...blockedUserIds, ...interactedUserIds])];

  const users = await User.find({
    _id: { $ne: _id, $nin: excludedUserIds },
    age: { $gte: agePreference.min, $lte: agePreference.max },
    gender: genderPreference,
    location: {
      $near: {
        $geometry: location,
        $maxDistance: maxDistance * 1000,
      },
    },
  })
    .sort({ _id: { $in: superlikedUsers.map((s) => s.fromUserId) } ? 1 : -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  return users;
}

module.exports = getPaginatedUsers;
