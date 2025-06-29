"use client";

// components/CustomConnectButton.tsx
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Button } from "./button";

/* eslint-disable @next/next/no-img-element */

type CustomConnectWalletProps = {
  showChainModal?: boolean;
  children?: React.ReactNode;
} & React.ComponentProps<typeof ConnectButton>;

export function ConnectWallet({
  children,
  showChainModal,
  ...props
}: CustomConnectWalletProps) {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Make sure the component is mounted and authenticated
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    className="bg-gradient-to-r from-slate-700 to-gray-700 text-white font-semibold px-4 py-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    {children}
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl"
                  >
                    Wrong Network
                  </Button>
                );
              }

              return (
                <div className="flex items-center gap-3">
                  {/* Chain Selector */}
                  {showChainModal && (
                    <Button
                      onClick={openChainModal}
                      variant="outline"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 hover:bg-gray-50"
                    >
                      {chain.hasIcon && (
                        <div className="w-5 h-5">
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              className="w-5 h-5 rounded-full"
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </Button>
                  )}

                  {/* Account Button */}
                  <Button
                    onClick={openAccountModal}
                    className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-6 rounded-xl flex items-center gap-3 font-medium border border-white/5"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-800 to-slate-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {account.displayName?.[0]?.toUpperCase()}
                    </div>
                    <span>{account.displayName}</span>
                    {props.showBalance && (
                      <span className="text-gray-400">
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ""}
                      </span>
                    )}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
