"use client"

import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { Card, CardContent } from "../../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../ui/tabs";

export function Settings() {
  const [bankOwner, setBankOwner] = useState('MYSELF');
  const [autoSaveVisible, setAutoSaveVisible] = useState(false);

  const showAutoSave = () => {
    setAutoSaveVisible(true);
    setTimeout(() => setAutoSaveVisible(false), 2000);
  };

  return (
    <div className="p-6">
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button className="py-4 px-1 text-sm font-medium border-b-2 border-primary text-primary">
              SETTINGS
            </button>
          </nav>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            {autoSaveVisible && (
              <div className="flex items-center bg-white shadow-md rounded-md px-4 py-2">
                <div className="w-4 h-4 rounded-full bg-green-500 mr-2" />
                <span className="text-sm text-gray-600">autosave success</span>
              </div>
            )}
          </div>

          <Card>
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-50 p-1">
                <TabsTrigger value="general" className="py-2">General</TabsTrigger>
                <TabsTrigger value="bank" className="py-2">Bank information</TabsTrigger>
              </TabsList>

              <TabsContent value="general">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">General Settings</h2>
                  {/* Add general settings content here */}
                </CardContent>
              </TabsContent>

              <TabsContent value="bank">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-medium">Bank information</h2>
                    <button className="text-blue-600 text-sm font-medium">EXAMPLES</button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        BANK ACCOUNT OWNER
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="accountOwner"
                            value="MYSELF"
                            checked={bankOwner === 'MYSELF'}
                            onChange={(e) => setBankOwner(e.target.value)}
                            className="mr-2"
                          />
                          MYSELF
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="accountOwner"
                            value="TRUSTEE"
                            checked={bankOwner === 'TRUSTEE'}
                            onChange={(e) => setBankOwner(e.target.value)}
                            className="mr-2"
                          />
                          TRUSTEE
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-600 mb-2">
                        FULL NAME (ACCOUNT OWNER)
                        <Info className="w-4 h-4 ml-2 text-gray-400" />
                      </label>
                      <input
                        type="text"
                        placeholder="Please input"
                        className="w-full p-2 border border-gray-200 rounded-md"
                        onChange={showAutoSave}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-600 mb-2">
                          ACCOUNT NUMBER
                          <Info className="w-4 h-4 ml-2 text-gray-400" />
                        </label>
                        <input
                          type="text"
                          placeholder="Bank Account (Not Card Number)"
                          className="w-full p-2 border border-gray-200 rounded-md"
                          onChange={showAutoSave}
                        />
                      </div>
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-600 mb-2">
                          SWIFT CODE
                          <Info className="w-4 h-4 ml-2 text-gray-400" />
                        </label>
                        <input
                          type="text"
                          placeholder="Please input"
                          className="w-full p-2 border border-gray-200 rounded-md"
                          onChange={showAutoSave}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600 mb-2 block">
                          OTHER IDENTIFIER CODES
                        </label>
                        <select className="w-full p-2 border border-gray-200 rounded-md bg-white" onChange={showAutoSave}>
                          <option>N/A</option>
                          <option>IBAN</option>
                          <option>IFSC</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 mb-2 block">
                          CODE NUMBER
                        </label>
                        <input
                          type="text"
                          placeholder="Please input"
                          className="w-full p-2 border border-gray-200 rounded-md"
                          onChange={showAutoSave}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600 mb-2 block">
                          BANK NAME
                        </label>
                        <input
                          type="text"
                          placeholder="Please input"
                          className="w-full p-2 border border-gray-200 rounded-md"
                          onChange={showAutoSave}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 mb-2 block">
                          BRANCH NAME
                        </label>
                        <input
                          type="text"
                          placeholder="Please input"
                          className="w-full p-2 border border-gray-200 rounded-md"
                          onChange={showAutoSave}
                        />
                      </div>
                    </div>

                    <p className="text-sm text-gray-500">
                      Please ensure that it's the same as the account information. For details, please inquire at your bank. If you are entering non-alphabetical characters (e.g. ü, ö), please fill them in with the corresponding English alphabets (e.g., u, o).
                    </p>

                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-2 block">
                        BRANCH ADDRESS
                      </label>
                      <input
                        type="text"
                        placeholder="City & Road"
                        className="w-full p-2 border border-gray-200 rounded-md"
                        onChange={showAutoSave}
                      />
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Settings;