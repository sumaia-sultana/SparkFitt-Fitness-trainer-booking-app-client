"use client";

import React from "react";
import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

const FooterComponent = () => {
  return (
   <Footer container>
  <div className="w-full">
    <div className="grid w-full sm:flex sm:justify-between md:grid md:grid-cols-3 gap-8">
      <div>
        <FooterBrand
          href="/"
          src="/src/assets/spark-fit-logo.svg" // Your logo URL
          alt="SparkFit Logo"
          name="SparkFit"
        />
      </div>
      <div>
        <FooterTitle title="Navigation" />
        <FooterLinkGroup col>
          <FooterLink href="/">Home</FooterLink>
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/community">Community</FooterLink>
          <FooterLink href="/dashboard">Dashboard</FooterLink>
          <FooterLink href="/trainer">Trainer</FooterLink>
        </FooterLinkGroup>
      </div>
      <div>
        <FooterTitle title="Legal" />
        <FooterLinkGroup col>
          <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
          <FooterLink href="/terms">Terms & Conditions</FooterLink>
        </FooterLinkGroup>
      </div>
    </div>

    <FooterDivider />

    <div className="w-full sm:flex sm:items-center sm:justify-between">
      <FooterCopyright href="/" by="SparkFit™" year={2025} />
      <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
        <FooterIcon href="https://facebook.com" icon={BsFacebook} />
        <FooterIcon href="https://instagram.com" icon={BsInstagram} />
        <FooterIcon href="https://twitter.com" icon={BsTwitter} />
        <FooterIcon href="https://github.com" icon={BsGithub} />
        <FooterIcon href="https://dribbble.com" icon={BsDribbble} />
      </div>
    </div>
  </div>
</Footer>

  );
};

export default FooterComponent;
