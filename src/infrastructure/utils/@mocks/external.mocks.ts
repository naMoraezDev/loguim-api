const firebaseSpy = jest.fn();
const dynamooseSpy = jest.fn();

class FirebaseSpy {
  auth() {
    return {
      verifyIdToken: jest.fn().mockResolvedValue({ uid: "uid" }),
      createCustomToken: jest.fn().mockResolvedValue("access_token"),
    };
  }
}

class RejectFirebaseSpy {
  auth() {
    return {
      verifyIdToken: jest.fn().mockRejectedValue(new Error()),
      createCustomToken: jest.fn().mockResolvedValue("access_token"),
    };
  }
}

const DynamooseSpy = {
  Condition: jest.fn().mockReturnValue({
    where: jest.fn().mockReturnValue({
      exists: jest.fn().mockReturnValue({ exec: jest.fn() }),
    }),
  }),
};

export {
  firebaseSpy,
  FirebaseSpy,
  DynamooseSpy,
  dynamooseSpy,
  RejectFirebaseSpy,
};
