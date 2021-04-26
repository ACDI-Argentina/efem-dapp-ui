import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { selectCurrentUser } from '../redux/reducers/currentUserSlice';
import { useSelector } from 'react-redux';
import { AppTransactionContext } from 'lib/blockchain/Web3App';
import { toChecksumAddress } from 'lib/blockchain/Web3Utils';
import AccountDialog from 'components/Dialogs/AccountDialog';

const Wrapper = styled.div``;

const AddressWrapper = styled.div`
  display: flex;
`;

const WalletIndicator = styled.div`
  padding: 0px 5px;
`;

const AddressLabel = styled.div`
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  padding: 3px 20px;
  border-radius: 24px;

  ${(props) =>
    props.success &&
    `
    color: #53a653;
    border: 1px solid #53a653;
    background-color: #48d24838;
  `}

  ${(props) =>
    props.warning &&
    `
    color: #ffc107;
    border: 1px solid #ffc107;
    background-color: #ffc10738;
  `}
`;
const ConnectButton = styled.button`
  font-size: 16px;
  margin: 10px;
  background-color: #53a653;
  cursor: pointer;
  padding: 3px 20px;
  border-radius: 24px;
  border: 0px;
  color: white;
  text-transform: capitalize;
  font-weight: bold;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
`;

const Connect = ({}) => {
  const [showModal, setShowModal] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const addr = toChecksumAddress(currentUser?.address);
  const { initAccount, network, walletConnect, provider } = useContext(AppTransactionContext);
  const isCorrectNetwork = network?.isCorrectNetwork || false;
  const success = isCorrectNetwork;
  const warning = !isCorrectNetwork;

  let walletIndicator = null;

  if(provider === "walletConnect"){
    walletIndicator = (
      <WalletIndicator>
        <img src="/img/walletconnect-logo.svg" style={{ width: '30px' }} />
      </WalletIndicator>
    );

  }

  return (
    <>
      <Wrapper>
        <button onClick={walletConnect}>Wallet connect</button>
        
        {currentUser?.address && (
          <AddressWrapper>
            {walletIndicator}

            <AddressLabel
              success={success}
              warning={warning}
              onClick={() => setShowModal(true)}
              title={isCorrectNetwork ? `${addr}` : `INCORRECT NETWORK - ${addr}`}
            >
              {`${addr.slice(0, 6)}...${addr.slice(-4)}`}
            </AddressLabel>
          </AddressWrapper>
        )}
        {!currentUser.address && (
          <ConnectButton onClick={() => initAccount()}>Connect</ConnectButton>
        )}
      </Wrapper>
      <AccountDialog
        address={addr}
        fullWidth={true}
        maxWidth="md"
        open={showModal}
        onClose={() => setShowModal(false)}
      ></AccountDialog>
    </>
  );
};

export default Connect;
