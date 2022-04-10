// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 < 0.9.0;

contract Ballot {
  struct Voter {
    uint weight;
    bool voted;
    address delegate;
    uint vote;
  }

  struct Proposal {
    bytes32 name;
    uint voteCount;
  }

  address public chairperson;
  mapping (address => Voter) public voters;

  Proposal[] public proposals;

  constructor(bytes32[] memory proposalNames) {
    chairperson = msg.sender;
    voters[chairperson].weight = 1;
    for (uint i = 0; i < proposalNames.length; i++) {
      proposals.push(Proposal({
        name: proposalNames[i],
        voteCount: 0
      }));
    }
  }

  function giveRightToVote(address voter) external {
    require(msg.sender == chairperson);
    require(!voters[voter].voted);
    require(voters[voter].weight == 0);
    voters[voter].weight = 1;
  }

  function delegate(address to) external {
    Voter storage sender = voters[msg.sender];
    require(!sender.voted);
    require(to != msg.sender);

    sender.voted = true;
    sender.delegate = to;

    Voter storage delegate_ = voters[to];
    if (delegate_.voted) {
      proposals[delegate_.vote].voteCount += sender.weight;
    } else {
      delegate_.weight += sender.weight;
    }
  }

  function vote(uint proposal) external {
    Voter storage sender = voters[msg.sender];
    require(sender.weight != 0);
    require(!sender.voted);
    sender.voted = true;
    sender.vote = proposal;

    proposals[proposal].voteCount += sender.weight;
  }
}
