const Blockchain = require("../blockchain");
const { INITIAL_BALANCE } = require("../config");
const Wallet = require("./index");
const TransactionPool = require("./transaction-pool");

describe('Wallet', () => {
    let wallet, tp, bc;

    beforeEach(() => {
        wallet = new Wallet();
        tp = new TransactionPool();
        bc = new Blockchain();
    });

    describe('creating a transaction', () => {
        let transaction, sendAmount, recipient;

        beforeEach(() => {
            sendAmount = 50;
            recipient = 'r3c1p13nt';
            transaction = wallet.createTransaction(recipient, sendAmount, bc, tp);
        });

        describe('and doing same transaction', () => {

            beforeEach(() => {
                transaction = wallet.createTransaction(recipient, sendAmount, bc, tp);
            });

            it('doubles the `sendAmount` subtracted from the wallet balance', () => {
                expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
                    .toEqual(wallet.balance - sendAmount * 2);
            });

            it('clones the sendAmount output for the recipient', () => {
                expect(transaction.outputs.filter(output => output.address === recipient)
                    .map(output => output.amount)).toEqual([sendAmount, sendAmount]);
            });
        });
    });

    describe('calculating Balance', () => {
        let addBalance, reapeatAdd, senderWallet;

        beforeEach(() => {
            senderWallet = new Wallet();
            addBalance = 100;
            reapeatAdd = 3;
            for (let i = 0; i < reapeatAdd; i++) {
                senderWallet.createTransaction(wallet.publicKey, addBalance, bc, tp);
            }
            bc.addBlock(tp.transactions);
        });

        it('calculate blance for blockchain transactions matching recipients', () => {
            expect(wallet.calculateBalance(bc)).toEqual(INITIAL_BALANCE + (addBalance * reapeatAdd));
        });

        it('calculate blance for blockchain transactions matching sender', () => {
            expect(senderWallet.calculateBalance(bc)).toEqual(INITIAL_BALANCE - (addBalance * reapeatAdd));
        });

        describe('recipient conduact a transaction', () => {
            let subtractBalance, recipientBalance;

            beforeEach(() => {
                tp.clear();
                subtractBalance = 60;
                recipientBalance = wallet.calculateBalance(bc);
                wallet.createTransaction(senderWallet.publicKey, subtractBalance, bc, tp);
                bc.addBlock(tp.transactions);
            });

            describe('sendar sends another transactions to the recipient', () => {

                beforeEach(() => {
                    tp.clear();
                    senderWallet.createTransaction(wallet.publicKey, addBalance, bc, tp);
                    bc.addBlock(tp.transactions);
                });

                it('calculates recipients balance only using transactions since its most recent one', () => {
                    expect(wallet.calculateBalance(bc)).toEqual(recipientBalance - subtractBalance + addBalance);
                });
            });
        });
    });
});